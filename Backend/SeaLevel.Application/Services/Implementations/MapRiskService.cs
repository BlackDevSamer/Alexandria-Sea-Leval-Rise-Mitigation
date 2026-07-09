using SeaLevel.Core.Entities;
using SeaLevel.Application.DTOs.Forecast;
using SeaLevel.Application.DTOs.MapRisk;
using SeaLevel.Application.DTOs.Weather;
using SeaLevel.Application.Services.Helpers;
using SeaLevel.Application.Services.Interfaces;
using SeaLevel.Core.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace SeaLevel.Application.Services.Implementations;

public class MapRiskService : IMapRiskService
{
    private readonly INasaPowerClient _nasaPowerClient;
    private readonly IMlForecastClient _mlForecastClient;
    private readonly IForecastLogRepository _forecastLogRepository;
    private readonly ILongTermScenarioRepository _scenarioRepository;
    private readonly ILandUseFeatureRepository _landUseRepository;

    public MapRiskService(
        INasaPowerClient nasaPowerClient,
        IMlForecastClient mlForecastClient,
        IForecastLogRepository forecastLogRepository,
        ILongTermScenarioRepository scenarioRepository,
        ILandUseFeatureRepository landUseRepository)
    {
        _nasaPowerClient = nasaPowerClient;
        _mlForecastClient = mlForecastClient;
        _forecastLogRepository = forecastLogRepository;
        _scenarioRepository = scenarioRepository;
        _landUseRepository = landUseRepository;
    }

    public async Task<MapRiskResponse> GetMapRiskAsync(
        string scenario,
        int year,
        DateTime? from = null,
        DateTime? to = null,
        CancellationToken cancellationToken = default)
    {
        RiskMappingHelper.ValidateScenario(scenario);
        RiskMappingHelper.ValidateYear(year);

        DateTime fromDate = from ?? DateTime.UtcNow.AddDays(-14);
        DateTime toDate = to ?? DateTime.UtcNow;

        IEnumerable<DailyWeatherRow> weatherRows = await _nasaPowerClient.GetDailyWeatherAsync(
            fromDate,
            toDate,
            cancellationToken: cancellationToken);

        MlForecastResponse forecast = await _mlForecastClient.GetForecastAsync(
            weatherRows,
            cancellationToken: cancellationToken);

        double basePredictedSeaLevel = RiskMappingHelper.GetBasePredictedSeaLevel(forecast);

        // Fetch rise parameters from DB
        var scenarioParam = await _scenarioRepository.GetByScenarioAndYearAsync(scenario, year, cancellationToken);
        double riseMm = scenarioParam != null ? scenarioParam.RiseInMillimeters : 0.0;
        double adjustedPredictedSeaLevel = basePredictedSeaLevel + riseMm;
        await _forecastLogRepository.AddAsync(new ForecastLog
        {
            UserId = "System",
            Scenario = scenario,
            Year = year,
            RequestedAt = DateTime.UtcNow,
            BaselineSeaLevel = basePredictedSeaLevel,
            ProjectedSeaLevel = adjustedPredictedSeaLevel
        });


        // Fetch zones from DB
        var dbFeatures = await _landUseRepository.GetAllAsync(cancellationToken);
        var projectionResult = ProjectionEngine.Calculate(adjustedPredictedSeaLevel, dbFeatures);

        return new MapRiskResponse
        {
            FloodedAreaKm2 = Math.Round(projectionResult.FloodedAreaKm2, 2),
            RiskLevel = projectionResult.RiskLevel,
            ColorCode = projectionResult.ColorCode,
            Description = projectionResult.RiskDescription
        };
    }
}
