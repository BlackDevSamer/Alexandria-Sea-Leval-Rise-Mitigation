namespace SeaLevel.Core.Entities;

public class LandUseFeature
{
    public int Id { get; set; }
    
    public string FeatureId { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty;
    
    public string Category { get; set; } = string.Empty;
    
    public string Province { get; set; } = string.Empty;
    
    public string District { get; set; } = string.Empty; // Standard mapped district
    
    public double ElevMin { get; set; }
    
    public double ThresholdMm { get; set; }
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
}
