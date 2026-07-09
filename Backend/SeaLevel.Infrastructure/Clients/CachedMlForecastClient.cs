using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using SeaLevel.Application.DTOs.Forecast;
using SeaLevel.Application.DTOs.Weather;
using SeaLevel.Application.Services.Interfaces;

namespace SeaLevel.Infrastructure.Clients;

public class CachedMlForecastClient : IMlForecastClient
{
    private readonly MlForecastClient _innerClient;
    private readonly IMemoryCache _memoryCache;
    private readonly IConfiguration _configuration;

    public CachedMlForecastClient(
        MlForecastClient innerClient,
        IMemoryCache memoryCache,
        IConfiguration configuration)
    {
        _innerClient = innerClient;
        _memoryCache = memoryCache;
        _configuration = configuration;
    }

    public async Task<MlForecastResponse> GetForecastAsync(
        IEnumerable<DailyWeatherRow>? newDays = null,
        int? horizonDays = null,
        CancellationToken cancellationToken = default)
    {
        var daysList = newDays?.ToList();
        string newDaysKey = "none";
        if (daysList != null && daysList.Count > 0)
        {
            var firstDate = daysList.Min(d => d.Date);
            var lastDate = daysList.Max(d => d.Date);
            newDaysKey = $"{daysList.Count}:{firstDate:yyyyMMdd}:{lastDate:yyyyMMdd}";
        }

        string cacheKey = $"mlforecast:full:{horizonDays ?? 30}:{newDaysKey}";
        if (_memoryCache.TryGetValue(cacheKey, out MlForecastResponse? cachedResponse) && cachedResponse is not null)
        {
            return cachedResponse;
        }

        var response = await _innerClient.GetForecastAsync(daysList, horizonDays, cancellationToken);

        int ttlHours = _configuration.GetValue<int?>("MlForecast:CacheTtlHours") ?? 6;
        _memoryCache.Set(cacheKey, response, TimeSpan.FromHours(ttlHours));

        return response;
    }

    public async Task<MlForecastResponse> GetQuickForecastAsync(
        int? horizonDays = null,
        CancellationToken cancellationToken = default)
    {
        string cacheKey = $"mlforecast:quick:{horizonDays ?? 30}";
        if (_memoryCache.TryGetValue(cacheKey, out MlForecastResponse? cachedResponse) && cachedResponse is not null)
        {
            return cachedResponse;
        }

        var response = await _innerClient.GetQuickForecastAsync(horizonDays, cancellationToken);

        int ttlHours = _configuration.GetValue<int?>("MlForecast:CacheTtlHours") ?? 6;
        _memoryCache.Set(cacheKey, response, TimeSpan.FromHours(ttlHours));

        return response;
    }
}
