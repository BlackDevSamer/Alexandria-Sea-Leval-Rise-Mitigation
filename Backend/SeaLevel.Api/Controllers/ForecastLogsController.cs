using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SeaLevel.Core.Entities;
using SeaLevel.Core.Interfaces;

namespace SeaLevel.Api.Controllers;

[ApiController]
[Route("api/forecast-logs")]
[Authorize]
public class ForecastLogsController : ControllerBase
{
    private readonly IForecastLogRepository _forecastLogRepository;
    private readonly UserManager<ApplicationUser> _userManager;

    public ForecastLogsController(IForecastLogRepository forecastLogRepository, UserManager<ApplicationUser> userManager)
    {
        _forecastLogRepository = forecastLogRepository;
        _userManager = userManager;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMyLogs(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var logs = await _forecastLogRepository.GetByUserAsync(userId, cancellationToken);
        return Ok(logs);
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllLogs(CancellationToken cancellationToken)
    {
        var logs = await _forecastLogRepository.GetAllAsync(cancellationToken);
        
        // We want to attach user emails to the logs for the admin dashboard
        var dtos = new List<object>();
        foreach (var log in logs)
        {
            var user = await _userManager.FindByIdAsync(log.UserId);
            dtos.Add(new
            {
                Id = log.Id,
                UserId = log.UserId,
                UserEmail = user?.Email ?? "Unknown",
                Username = user?.UserName ?? "Unknown",
                Scenario = log.Scenario,
                Year = log.Year,
                RequestedAt = log.RequestedAt,
                BaselineSeaLevel = log.BaselineSeaLevel,
                ProjectedSeaLevel = log.ProjectedSeaLevel
            });
        }

        return Ok(dtos);
    }
}
