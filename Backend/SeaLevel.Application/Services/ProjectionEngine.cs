using System;
using System.Collections.Generic;
using System.Linq;

namespace SeaLevel.Application.Services;

public record QismResult(
    string Name,
    double FloodedAreaKm2,
    long ExposedPopulation,
    string RiskLevel
);

public record InfrastructureFacility(
    string Name,
    string District,
    string Type,
    double ThresholdMm,
    string Impact,
    double Lat,
    double Lng
);

public record ProjectionResult(
    double ProjectedSeaLevel,
    double FloodedAreaKm2,
    long PopulationAtRisk,
    string RiskLevel,
    string ColorCode,
    string RiskDescription,
    IReadOnlyList<string> HighRiskAreas,
    string InformalSettlementsExposure,
    IReadOnlyList<QismResult> Qisms,
    IReadOnlyList<InfrastructureFacility> AtRiskFacilities
);

public static class ProjectionEngine
{
    private static readonly (double AreaThresholdKm2, double DensityPerKm2)[] PopulationZones =
    [
        (5.0, 8_000),
        (15.0, 12_000),
        (35.0, 18_000),
        (70.0, 22_000),
        (double.MaxValue, 25_000),
    ];


    public static double GetProjectedSeaLevel(double baselineMm, double riseInMillimeters)
    {
        return baselineMm + riseInMillimeters;
    }

    private static double CalculateFloodedAreaKm2(double seaLevelMm)
    {
        if (seaLevelMm < 2200) return 0;
        if (seaLevelMm <= 2400) return (seaLevelMm - 2200) * 0.010;
        if (seaLevelMm <= 2600) return 2.0 + (seaLevelMm - 2400) * 0.040;
        if (seaLevelMm <= 2800) return 10.0 + (seaLevelMm - 2600) * 0.090;
        if (seaLevelMm <= 3000) return 28.0 + (seaLevelMm - 2800) * 0.160;
        
        double area = 60.0 + (seaLevelMm - 3000) * 0.200;
        return Math.Min(area, 180.0);
    }

    private static long CalculatePopulationAtRisk(double floodedAreaKm2)
    {
        double remainingArea = floodedAreaKm2;
        double previousThreshold = 0;
        double totalPopulation = 0;

        foreach (var zone in PopulationZones)
        {
            if (remainingArea <= 0) break;

            double trancheArea = Math.Min(remainingArea, zone.AreaThresholdKm2 - previousThreshold);
            totalPopulation += trancheArea * zone.DensityPerKm2;
            
            remainingArea -= trancheArea;
            previousThreshold = zone.AreaThresholdKm2;
        }

        return (long)totalPopulation;
    }

    private static (string Level, string Color, string Description) GetRiskInfo(double seaLevel)
    {
        if (seaLevel < 2300) return ("منخفض", "#E3F2FD", "تأثير محدود");
        if (seaLevel <= 2500) return ("متوسط", "#90CAF9", "خطر متزايد");
        if (seaLevel <= 2700) return ("مرتفع", "#2196F3", "تهديد للبنية التحتية");
        if (seaLevel <= 2900) return ("مرتفع جدًا", "#1976D2", "تغلغل المياه");
        if (seaLevel <= 3100) return ("شديد", "#1565C0", "غرق مناطق قديمة");
        return ("كارثي", "#0D47A1", "اختفاء معالم رئيسية");
    }

    private static string GetInformalSettlementsExposure(double floodedAreaKm2)
    {
        if (floodedAreaKm2 < 5) return "منخفض";
        if (floodedAreaKm2 <= 15) return "متوسط";
        if (floodedAreaKm2 <= 35) return "مرتفع";
        if (floodedAreaKm2 <= 70) return "شديد";
        return "كارثي";
    }


    public static ProjectionResult Calculate(double projectedSeaLevel)
    {
        return Calculate(projectedSeaLevel, null);
    }

    public static ProjectionResult Calculate(double projectedSeaLevel, IEnumerable<SeaLevel.Core.Entities.LandUseFeature>? dbFeatures)
    {
        double floodedAreaKm2 = CalculateFloodedAreaKm2(projectedSeaLevel);
        long populationAtRisk = CalculatePopulationAtRisk(floodedAreaKm2);
        var (riskLevel, colorCode, riskDescription) = GetRiskInfo(projectedSeaLevel);
        string informalSettlementsExposure = GetInformalSettlementsExposure(floodedAreaKm2);

        IReadOnlyList<(string Name, double ThresholdMm)> unifiedZones;
        List<InfrastructureFacility> allFacilities = new();

        if (dbFeatures != null && dbFeatures.Any())
        {
            // Map unified zones from database using Province for granular frontend matching
            // We use the dynamically extracted Province names but map them to calibrated topographic thresholds,
            // because the geojson point-of-interest elevations (which often include beaches/ports at 0m) 
            // cause all coastal districts to flood instantly if we use Min or Avg.
            var thresholdByZone = dbFeatures
                .Where(f => !string.IsNullOrWhiteSpace(f.Province))
                .Select(f => f.Province)
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToDictionary(
                    p => p,
                    p => GetCalibratedDistrictThreshold(p),
                    StringComparer.OrdinalIgnoreCase
                );

            unifiedZones = thresholdByZone
                .OrderBy(item => item.Value)
                .ThenBy(item => item.Key, StringComparer.Ordinal)
                .Select(item => (Name: item.Key, ThresholdMm: item.Value))
                .ToList();

            // Extract facilities from dbFeatures
            var facilityKeywords = new[] { "مستشفى", "مستوصف", "ميناء", "مطار", "كهرباء", "مياه", "مدرسة", "كلية", "طريق" };
            allFacilities = dbFeatures
                .Where(f => facilityKeywords.Any(k => f.Name.Contains(k) || f.Category.Contains(k)))
                .Select(f => new InfrastructureFacility(
                    Name: string.IsNullOrWhiteSpace(f.Name) ? f.Category : f.Name,
                    District: f.District,
                    Type: MapCategoryToFrontendType(f.Category, f.Name),
                    ThresholdMm: f.ThresholdMm,
                    Impact: "خطر الفيضان", // Generic default impact
                    Lat: f.Latitude,
                    Lng: f.Longitude
                ))
                .ToList();
        }
        else
        {
            unifiedZones = new List<(string, double)>();
        }

        var activeZones = unifiedZones
            .Where(z => projectedSeaLevel >= z.ThresholdMm)
            .ToList();

        var highRiskAreas = activeZones
            .Select(z => z.Name)
            .ToList();

        var qisms = new List<QismResult>();
        if (floodedAreaKm2 > 0 && activeZones.Count > 0)
        {
            double totalWeight = 0;
            for (int i = 0; i < activeZones.Count; i++)
            {
                totalWeight += activeZones.Count - i;
            }

            double currentTotalArea = 0;
            for (int i = 0; i < activeZones.Count; i++)
            {
                var zone = activeZones[i];
                double zoneWeight = activeZones.Count - i;
                double qismArea = floodedAreaKm2 * (zoneWeight / totalWeight);

                if (i == activeZones.Count - 1)
                {
                    qismArea = Math.Max(0, floodedAreaKm2 - currentTotalArea);
                }

                if (qismArea <= 0)
                {
                    continue;
                }

                double cumulativeAreaAfterQism = currentTotalArea + qismArea;
                long qismPop = CalculatePopulationAtRisk(cumulativeAreaAfterQism) - CalculatePopulationAtRisk(currentTotalArea);

                string qismRisk = GetInformalSettlementsExposure(cumulativeAreaAfterQism);

                qisms.Add(new QismResult(zone.Name, qismArea, qismPop, qismRisk));
                currentTotalArea = cumulativeAreaAfterQism;
            }
        }

        var atRiskFacilities = allFacilities
            .Where(f => projectedSeaLevel >= f.ThresholdMm)
            .ToList();

        return new ProjectionResult(
            projectedSeaLevel,
            floodedAreaKm2,
            populationAtRisk,
            riskLevel,
            colorCode,
            riskDescription,
            highRiskAreas,
            informalSettlementsExposure,
            qisms,
            atRiskFacilities
        );
    }

    private static double GetCalibratedDistrictThreshold(string province)
    {
        string pLower = province.Trim().ToLowerInvariant();
        if (pLower.Contains("مينا البصل")) return 2250; // المكس
        if (pLower.Contains("الدخيلة")) return 2300;
        if (pLower.Contains("الجمرك")) return 2450;
        if (pLower.Contains("المنشية")) return 2550;
        if (pLower.Contains("المنتزة") || pLower.Contains("المنتزه")) return 2650;
        if (pLower.Contains("محرم بك")) return 2950;
        if (pLower.Contains("باب شرقى") || pLower.Contains("باب شرق")) return 3050;
        if (pLower.Contains("ثان الرمل") || pLower.Contains("سيدى جابر") || pLower.Contains("أول الرمل") || pLower.Contains("العامرية") || pLower.Contains("برج العرب") || pLower.Contains("العطارين") || pLower.Contains("كرموز") || pLower.Contains("اللبان")) return 3150;
        
        return 3200; // Default high threshold
    }

    private static string MapCategoryToFrontendType(string category, string name)
    {
        string c = (category ?? "").ToLowerInvariant();
        string n = (name ?? "").ToLowerInvariant();
        if (c.Contains("health") || n.Contains("مستشفى") || n.Contains("مستوصف")) return "hospitals";
        if (c.Contains("port") || n.Contains("ميناء")) return "ports";
        if (c.Contains("transport") || n.Contains("مطار") || n.Contains("طريق") || n.Contains("قطار") || n.Contains("سكة")) return "transport";
        return "utilities"; // Default for educational, power, water, etc.
    }
}