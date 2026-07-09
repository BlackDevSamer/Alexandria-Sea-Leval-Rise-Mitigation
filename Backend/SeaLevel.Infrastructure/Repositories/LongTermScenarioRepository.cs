using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SeaLevel.Core.Entities;
using SeaLevel.Core.Interfaces;
using SeaLevel.Infrastructure.Persistence;

namespace SeaLevel.Infrastructure.Repositories;

public class LongTermScenarioRepository : ILongTermScenarioRepository
{
    private readonly AppDbContext _dbContext;

    public LongTermScenarioRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<LongTermScenario>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.LongTermScenarios
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<LongTermScenario?> GetByScenarioAndYearAsync(string scenario, int year, CancellationToken cancellationToken = default)
    {
        return await _dbContext.LongTermScenarios
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Scenario == scenario && s.Year == year, cancellationToken);
    }
}
