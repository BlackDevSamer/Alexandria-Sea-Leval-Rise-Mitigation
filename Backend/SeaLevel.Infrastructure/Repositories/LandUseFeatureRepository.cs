using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SeaLevel.Core.Entities;
using SeaLevel.Core.Interfaces;
using SeaLevel.Infrastructure.Persistence;

namespace SeaLevel.Infrastructure.Repositories;

public class LandUseFeatureRepository : ILandUseFeatureRepository
{
    private readonly AppDbContext _dbContext;

    public LandUseFeatureRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<LandUseFeature>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.LandUseFeatures
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }
}
