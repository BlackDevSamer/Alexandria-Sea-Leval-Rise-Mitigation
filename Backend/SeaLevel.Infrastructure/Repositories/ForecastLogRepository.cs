using Microsoft.EntityFrameworkCore;
using SeaLevel.Core.Entities;
using SeaLevel.Core.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using SeaLevel.Infrastructure.Persistence;

namespace SeaLevel.Infrastructure.Repositories;

public class ForecastLogRepository : IForecastLogRepository
{
    private readonly AppDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ForecastLogRepository(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task AddAsync(ForecastLog log, CancellationToken cancellationToken = default)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        
        // Only override if we found a user ID and it's not already set correctly
        if (!string.IsNullOrEmpty(userId))
        {
            log.UserId = userId;
        }
        else if (string.IsNullOrEmpty(log.UserId))
        {
            log.UserId = "System"; // Fallback
        }

        await _dbContext.ForecastLogs.AddAsync(log, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<ForecastLog>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        List<ForecastLog> logs = await _dbContext.ForecastLogs
            .AsNoTracking()
            .OrderByDescending(log => log.RequestedAt)
            .ToListAsync(cancellationToken);

        return logs;
    }

    public async Task<IEnumerable<ForecastLog>> GetByUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        List<ForecastLog> logs = await _dbContext.ForecastLogs
            .AsNoTracking()
            .Where(log => log.UserId == userId)
            .OrderByDescending(log => log.RequestedAt)
            .ToListAsync(cancellationToken);

        return logs;
    }
}
