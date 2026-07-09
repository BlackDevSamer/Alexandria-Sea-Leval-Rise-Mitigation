import re
import os

files = [
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\ChatService.cs",
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\DashboardService.cs",
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\InfrastructureService.cs",
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\MapRiskService.cs",
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\PopulationService.cs",
    r"C:\Users\lyr1csan\Desktop\robotics\Alexandria-Sea-Leval-Rise-Mitigation\Backend\SeaLevel.Application\Services\Implementations\ReportService.cs"
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(
        "_ = _forecastLogRepository.AddAsync(",
        "await _forecastLogRepository.AddAsync("
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
