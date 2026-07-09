import re
import os

files = [
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\AnalyticsService.cs"
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add using if missing
    if "using SeaLevel.Core.Interfaces;" not in content:
        content = "using SeaLevel.Core.Interfaces;\n" + content
    
    if "using SeaLevel.Core.Entities;" not in content:
        content = "using SeaLevel.Core.Entities;\n" + content

    # 2. Add field
    if "private readonly IForecastLogRepository _forecastLogRepository;" not in content:
        content = re.sub(
            r"(private readonly IMlForecastClient[^;]+;)",
            r"\1\n    private readonly IForecastLogRepository _forecastLogRepository;",
            content,
            count=1
        )
        
    # 3. Add to constructor
    if "IForecastLogRepository forecastLogRepository" not in content:
        content = re.sub(
            r"(IMlForecastClient mlForecastClient,?)",
            r"\1\n        IForecastLogRepository forecastLogRepository,",
            content,
            count=1
        )
        content = re.sub(
            r"(_mlForecastClient = mlForecastClient;)",
            r"\1\n        _forecastLogRepository = forecastLogRepository;",
            content,
            count=1
        )
        
    # 4. Insert log saving
    log_stmt = """
        _ = _forecastLogRepository.AddAsync(new ForecastLog
        {
            UserId = "System",
            Scenario = scenario,
            Year = year,
            RequestedAt = DateTime.UtcNow,
            BaselineSeaLevel = basePredictedSeaLevel,
            ProjectedSeaLevel = adjustedPredictedSeaLevel
        });
"""
    if "_forecastLogRepository.AddAsync" not in content:
        content = re.sub(
            r"(double adjustedPredictedSeaLevel = basePredictedSeaLevel \+ riseMm;)",
            r"\1" + log_stmt,
            content
        )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
