using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using SeaLevel.Core.Entities;

namespace SeaLevel.Core.Interfaces;

public interface ILandUseFeatureRepository
{
    Task<IReadOnlyList<LandUseFeature>> GetAllAsync(CancellationToken cancellationToken = default);
}
