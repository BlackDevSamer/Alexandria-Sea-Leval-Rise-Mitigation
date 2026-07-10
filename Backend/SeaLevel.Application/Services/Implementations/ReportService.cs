using SeaLevel.Core.Entities;
using SeaLevel.Application.DTOs.Forecast;
using SeaLevel.Application.DTOs.Reports;
using SeaLevel.Application.DTOs.Weather;
using SeaLevel.Application.Services.Helpers;
using SeaLevel.Application.Services.Interfaces;
using SeaLevel.Core.Interfaces;
using System.Text;

namespace SeaLevel.Application.Services.Implementations;

public class ReportService : IReportService
{
    private readonly INasaPowerClient _nasaPowerClient;
    private readonly IMlForecastClient _mlForecastClient;
    private readonly IForecastLogRepository _forecastLogRepository;
    private readonly ILongTermScenarioRepository _scenarioRepository;
    private readonly ILandUseFeatureRepository _landUseRepository;

    public ReportService(
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

    public async Task<ReportStatisticsResponse> GetStatisticsAsync(
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

        double floodedArea = Math.Round(projectionResult.FloodedAreaKm2, 2);
        double exposedPopulation = projectionResult.PopulationAtRisk;
        double totalPopulation = Math.Round(5_500_000 + ((year - 2030) / 20.0 * 350_000), 0);
        double protectedPopulation = Math.Max(0.0, totalPopulation - exposedPopulation);

        return new ReportStatisticsResponse
        {
            FloodData = new List<FloodDataItem>
            {
                new() { Name = "Flooded Area (km2)", Value = floodedArea },
                new() { Name = "Predicted Sea Level (mm)", Value = Math.Round(adjustedPredictedSeaLevel, 2) },
                new() { Name = "Baseline Threshold (mm)", Value = 2200 }
            },
            PopulationData = new List<PopulationDataItem>
            {
                new() { Name = "Exposed Population", Value = exposedPopulation, Color = "#ef4444" },
                new() { Name = "Protected Population", Value = protectedPopulation, Color = "#22c55e" },
                new() { Name = "Total Population", Value = totalPopulation, Color = "#3b82f6" }
            }
        };
    }

    public async Task<byte[]> ExportPredictionsCsvAsync(
        string scenario,
        int year,
        CancellationToken cancellationToken = default)
    {
        RiskMappingHelper.ValidateScenario(scenario);
        RiskMappingHelper.ValidateYear(year);

        DateTime fromDate = DateTime.UtcNow.AddDays(-14);
        DateTime toDate = DateTime.UtcNow;

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

        double totalPopulation = Math.Round(5_500_000 + ((year - 2030) / 20.0 * 350_000), 0);
        double exposedPopulation = projectionResult.PopulationAtRisk;
        double protectedPopulation = Math.Max(0.0, totalPopulation - exposedPopulation);

        var sb = new StringBuilder();
        
        // Write header
        sb.AppendLine("Section,NameOrMetric,ValueOrType,RiskLevel,FloodedAreaKm2,ExposedPopulation,DetailsOrImpact,Latitude,Longitude");
        
        // Section: Overview
        sb.AppendLine($"Overview,Scenario,{scenario},,,,,,,");
        sb.AppendLine($"Overview,Year,{year},,,,,,,");
        sb.AppendLine($"Overview,Baseline Sea Level (mm),{Math.Round(basePredictedSeaLevel, 2)},,,,,,,");
        sb.AppendLine($"Overview,Projected Sea Level (mm),{Math.Round(adjustedPredictedSeaLevel, 2)},,,,,,,");
        sb.AppendLine($"Overview,Flooded Area (km2),{Math.Round(projectionResult.FloodedAreaKm2, 2)},,,,,,,");
        sb.AppendLine($"Overview,Exposed Population,{exposedPopulation},,,,,,,");
        sb.AppendLine($"Overview,Protected Population,{protectedPopulation},,,,,,,");
        sb.AppendLine($"Overview,Overall Risk Level,{projectionResult.RiskLevel},,,,,,,");
        sb.AppendLine($"Overview,Overall Risk Description,{projectionResult.RiskDescription},,,,,,,");
        sb.AppendLine($"Overview,Informal Settlements Exposure,{projectionResult.InformalSettlementsExposure},,,,,,,");
        sb.AppendLine(",,,,,,,,");

        // Section: Districts
        sb.AppendLine("Section,District Name,Flooded Area (km2),Risk Level,Exposed Population,Details,,,");
        foreach (var qism in projectionResult.Qisms)
        {
            string name = EscapeCsvField(qism.Name);
            sb.AppendLine($"District,{name},{Math.Round(qism.FloodedAreaKm2, 2)},{qism.RiskLevel},{qism.ExposedPopulation},,,,");
        }
        sb.AppendLine(",,,,,,,,");

        // Section: Infrastructure Facilities
        sb.AppendLine("Section,Facility Name,Type,District,Threshold (mm),Impact,Latitude,Longitude,");
        foreach (var fac in projectionResult.AtRiskFacilities)
        {
            string name = EscapeCsvField(fac.Name);
            string type = EscapeCsvField(fac.Type);
            string district = EscapeCsvField(fac.District);
            string impact = EscapeCsvField(fac.Impact);
            sb.AppendLine($"Facility,{name},{type},{district},{fac.ThresholdMm},{impact},{fac.Lat},{fac.Lng},");
        }

        return Encoding.UTF8.GetBytes(sb.ToString());
    }

    private static string EscapeCsvField(string field)
    {
        if (string.IsNullOrEmpty(field)) return "";
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n") || field.Contains("\r"))
        {
            return $"\"{field.Replace("\"", "\"\"")}\"";
        }
        return field;
    }
}
