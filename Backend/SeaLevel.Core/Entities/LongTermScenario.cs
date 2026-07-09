namespace SeaLevel.Core.Entities;

public class LongTermScenario
{
    public int Id { get; set; }
    
    public string Scenario { get; set; } = string.Empty;
    
    public int Year { get; set; }
    
    public double RiseInMeters { get; set; }
    
    public double RiseInMillimeters { get; set; }
}
