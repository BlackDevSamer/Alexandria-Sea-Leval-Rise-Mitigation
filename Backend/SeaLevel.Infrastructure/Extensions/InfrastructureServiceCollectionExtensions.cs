using Microsoft.Extensions.DependencyInjection;
using SeaLevel.Application.Services.Interfaces;
using SeaLevel.Core.Interfaces;
using SeaLevel.Infrastructure.Clients;
using SeaLevel.Infrastructure.Repositories;

namespace SeaLevel.Infrastructure.Extensions;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<IForecastLogRepository, ForecastLogRepository>();
        services.AddScoped<ILandUseFeatureRepository, LandUseFeatureRepository>();
        services.AddScoped<ILongTermScenarioRepository, LongTermScenarioRepository>();

        services.AddScoped<NasaPowerClient>();
        services.AddScoped<INasaPowerClient, CachedNasaPowerClient>();

        services.AddScoped<MlForecastClient>();
        services.AddScoped<IMlForecastClient, CachedMlForecastClient>();
        services.AddScoped<IChatCompletionClient, GroqChatClient>();

        return services;
    }
}
