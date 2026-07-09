using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeaLevel.Application.DTOs.Queries;
using SeaLevel.Application.DTOs.Reports;
using SeaLevel.Application.Services.Interfaces;

namespace SeaLevel.Api.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("statistics")]
    public async Task<ActionResult<ReportStatisticsResponse>> GetStatistics(
        [FromQuery] ScenarioYearQuery query,
        CancellationToken cancellationToken)
    {
        ReportStatisticsResponse response = await _reportService.GetStatisticsAsync(
            query.Scenario,
            query.Year,
            cancellationToken: cancellationToken);

        return Ok(response);
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export(
        [FromQuery] ScenarioYearQuery query,
        CancellationToken cancellationToken)
    {
        byte[] csvBytes = await _reportService.ExportPredictionsCsvAsync(
            query.Scenario,
            query.Year,
            cancellationToken: cancellationToken);

        return File(csvBytes, "text/csv", $"predictions-data-{query.Scenario}-{query.Year}.csv");
    }
}
