using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using SeaLevel.Core.Entities;

namespace SeaLevel.Core.Interfaces;

public interface ILongTermScenarioRepository
{
    Task<IReadOnlyList<LongTermScenario>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<LongTermScenario?> GetByScenarioAndYearAsync(string scenario, int year, CancellationToken cancellationToken = default);
}
