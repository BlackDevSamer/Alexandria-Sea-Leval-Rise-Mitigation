using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using ExcelDataReader;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using SeaLevel.Core.Entities;

namespace SeaLevel.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();
        // Automatically run migrations if needed
        context.Database.Migrate();

        var roleManager = serviceProvider.GetRequiredService<Microsoft.AspNetCore.Identity.RoleManager<Microsoft.AspNetCore.Identity.IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<Microsoft.AspNetCore.Identity.UserManager<ApplicationUser>>();

        string[] roleNames = { "Admin", "User" };
        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                await roleManager.CreateAsync(new Microsoft.AspNetCore.Identity.IdentityRole(roleName));
            }
        }

        var adminUser = await userManager.FindByEmailAsync("admin@sealevel.com");
        if (adminUser == null)
        {
            var user = new ApplicationUser
            {
                UserName = "admin",
                Email = "admin@sealevel.com",
            };
            var createPowerUser = await userManager.CreateAsync(user, "Admin@123");
            if (createPowerUser.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
        }

        bool hasChanges = false;

        // Seed scenarios from Excel
        if (!context.LongTermScenarios.Any())
        {
            try
            {
                string excelPath = FindFile("scenarios_longterm.xlsx");
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

                using var stream = File.Open(excelPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                using var reader = ExcelReaderFactory.CreateReader(stream);
                
                var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
                {
                    ConfigureDataTable = _ => new ExcelDataTableConfiguration
                    {
                        UseHeaderRow = true
                    }
                });

                var table = dataSet.Tables[0];
                foreach (System.Data.DataRow row in table.Rows)
                {
                    string scenario = row["scenario"]?.ToString() ?? "";
                    string yearStr = row["year"]?.ToString() ?? "";
                    string riseStr = row["rise in meters"]?.ToString() ?? "";

                    if (!string.IsNullOrEmpty(scenario) && int.TryParse(yearStr, out int year) && double.TryParse(riseStr, out double riseInMeters))
                    {
                        var entity = new LongTermScenario
                        {
                            Scenario = scenario.Trim().ToUpperInvariant(),
                            Year = year,
                            RiseInMeters = riseInMeters,
                            RiseInMillimeters = riseInMeters * 1000.0
                        };
                        context.LongTermScenarios.Add(entity);
                        hasChanges = true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding scenarios: {ex.Message}");
            }
        }

        // Seed geojson land use features
        if (!context.LandUseFeatures.Any())
        {
            try
            {
                string geoJsonPath = FindFile("land_use_final.geojson");
                using var doc = JsonDocument.Parse(File.ReadAllText(geoJsonPath));
                var root = doc.RootElement;

                if (root.TryGetProperty("features", out var featuresElement) && featuresElement.ValueKind == JsonValueKind.Array)
                {
                    foreach (var feature in featuresElement.EnumerateArray())
                    {
                        var properties = feature.GetProperty("properties");

                        string id = "";
                        if (properties.TryGetProperty("id", out var idProp))
                        {
                            id = idProp.GetString() ?? idProp.GetRawText();
                        }
                        if (string.IsNullOrEmpty(id) && properties.TryGetProperty("@id", out var atIdProp))
                        {
                            id = atIdProp.GetString() ?? "";
                        }

                        string name = "";
                        if (properties.TryGetProperty("name", out var nameProp))
                        {
                            name = nameProp.GetString() ?? "";
                        }
                        if (string.IsNullOrEmpty(name) && properties.TryGetProperty("name:ar", out var nameArProp))
                        {
                            name = nameArProp.GetString() ?? "";
                        }
                        if (string.IsNullOrEmpty(name) && properties.TryGetProperty("name:en", out var nameEnProp))
                        {
                            name = nameEnProp.GetString() ?? "";
                        }

                        string category = "";
                        if (properties.TryGetProperty("category", out var catProp))
                        {
                            category = catProp.GetString() ?? "";
                        }

                        string province = "";
                        if (properties.TryGetProperty("province", out var provProp))
                        {
                            province = provProp.GetString() ?? "";
                        }

                        double elevMin = 0.0;
                        if (properties.TryGetProperty("elev_min", out var elevProp))
                        {
                            if (elevProp.ValueKind == JsonValueKind.Number)
                            {
                                elevMin = elevProp.GetDouble();
                            }
                            else if (elevProp.ValueKind == JsonValueKind.String && double.TryParse(elevProp.GetString(), out double parsedElev))
                            {
                                elevMin = parsedElev;
                            }
                        }

                        double latitude = 31.2001;
                        double longitude = 29.9187;
                        if (feature.TryGetProperty("geometry", out var geometry))
                        {
                            (latitude, longitude) = GetCentroid(geometry);
                        }

                        string district = MapProvinceToDistrict(province, name);

                        var entity = new LandUseFeature
                        {
                            FeatureId = id,
                            Name = name,
                            Category = category,
                            Province = province,
                            District = district,
                            ElevMin = elevMin,
                            ThresholdMm = elevMin * 1000.0,
                            Latitude = latitude,
                            Longitude = longitude
                        };

                        context.LandUseFeatures.Add(entity);
                        hasChanges = true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding geojson land use: {ex.Message}");
            }
        }

        if (hasChanges)
        {
            context.SaveChanges();
        }
    }

    private static string FindFile(string filename)
    {
        var currentDir = new DirectoryInfo(AppContext.BaseDirectory);
        while (currentDir != null)
        {
            var filePath = Path.Combine(currentDir.FullName, filename);
            if (File.Exists(filePath))
            {
                return filePath;
            }
            var parentFilePath = Path.Combine(currentDir.FullName, "..", filename);
            if (File.Exists(parentFilePath))
            {
                return Path.GetFullPath(parentFilePath);
            }
            var parentParentFilePath = Path.Combine(currentDir.FullName, "..", "..", filename);
            if (File.Exists(parentParentFilePath))
            {
                return Path.GetFullPath(parentParentFilePath);
            }
            currentDir = currentDir.Parent;
        }
        throw new FileNotFoundException($"Could not locate {filename} in parent directories.");
    }

    private static (double Lat, double Lng) GetCentroid(JsonElement geometry)
    {
        if (!geometry.TryGetProperty("coordinates", out var coords))
        {
            return (31.2001, 29.9187);
        }

        double sumLat = 0;
        double sumLng = 0;
        int count = 0;

        void ProcessCoordinates(JsonElement element)
        {
            if (element.ValueKind == JsonValueKind.Array)
            {
                if (element.GetArrayLength() == 2 &&
                    element[0].ValueKind == JsonValueKind.Number &&
                    element[1].ValueKind == JsonValueKind.Number)
                {
                    sumLng += element[0].GetDouble();
                    sumLat += element[1].GetDouble();
                    count++;
                }
                else
                {
                    foreach (var child in element.EnumerateArray())
                    {
                        ProcessCoordinates(child);
                    }
                }
            }
        }

        ProcessCoordinates(coords);

        if (count > 0)
        {
            return (sumLat / count, sumLng / count);
        }

        return (31.2001, 29.9187);
    }

    private static string MapProvinceToDistrict(string province, string name)
    {
        string provLower = province.Trim().ToLowerInvariant();
        string nameLower = name.Trim().ToLowerInvariant();

        if (provLower.Contains("الجمرك") || nameLower.Contains("الجمرك") || provLower.Contains("gomrok") || nameLower.Contains("gomrok")) return "الجمرك";
        if (provLower.Contains("المنشية") || nameLower.Contains("المنشية") || provLower.Contains("manshiya") || nameLower.Contains("manshiya")) return "الجمرك";
        if (nameLower.Contains("الأنفوشي") || nameLower.Contains("الأنفوشى") || nameLower.Contains("anfoushi")) return "الجمرك";
        if (nameLower.Contains("القديمة") || nameLower.Contains("old")) return "الجمرك";

        if (provLower.Contains("الدخيلة") || nameLower.Contains("الدخيلة") || provLower.Contains("dekheila") || nameLower.Contains("dekheila")) return "الدخيلة";
        if (provLower.Contains("مينا البصل") || nameLower.Contains("مينا البصل") || provLower.Contains("bassel") || nameLower.Contains("bassel")) return "المكس";
        if (provLower.Contains("العامرية") || nameLower.Contains("العامرية") || provLower.Contains("amreya") || nameLower.Contains("amreya")) return "المكس";
        if (nameLower.Contains("المكس") || nameLower.Contains("el max") || nameLower.Contains("max")) return "المكس";

        if (provLower.Contains("المنتزة") || provLower.Contains("المنتزه") || nameLower.Contains("المنتزه") || nameLower.Contains("المنتزة") ||
            provLower.Contains("montaza") || nameLower.Contains("montaza"))
        {
            if (nameLower.Contains("أبو قير") || nameLower.Contains("ابو قير") || nameLower.Contains("abukir") || nameLower.Contains("aboukir"))
            {
                return "أبو قير";
            }
            return "المنتزه";
        }

        if (provLower.Contains("برج العرب") || provLower.Contains("borg") || nameLower.Contains("borg")) return "الدخيلة";

        if (provLower.Contains("باب شرقى") || provLower.Contains("باب شرق") || provLower.Contains("sharq") ||
            provLower.Contains("العطارين") || provLower.Contains("attarin") ||
            provLower.Contains("اللبان") || provLower.Contains("labban") ||
            provLower.Contains("محرم بك") || provLower.Contains("moharam") ||
            provLower.Contains("وسط") || provLower.Contains("wasat"))
        {
            return "حي وسط";
        }

        if (provLower.Contains("سيدى جابر") || provLower.Contains("سيدي جابر") || provLower.Contains("sidi jaber") ||
            provLower.Contains("رمل") || provLower.Contains("raml") ||
            provLower.Contains("شرق") || provLower.Contains("east"))
        {
            return "حي شرق";
        }

        return "حي وسط"; // Default fallback
    }
}
