using SeaLevel.Application.DTOs.Reports;

namespace SeaLevel.Application.Services.Interfaces;

public interface IReportService
{
    Task<ReportStatisticsResponse> GetStatisticsAsync(
        string scenario,
        int year,
        DateTime? from = null,
        DateTime? to = null,
        CancellationToken cancellationToken = default);

    Task<byte[]> ExportPredictionsCsvAsync(
        string scenario,
        int year,
        CancellationToken cancellationToken = default);
}
