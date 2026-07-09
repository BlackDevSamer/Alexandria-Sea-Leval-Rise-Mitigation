using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SeaLevel.Infrastructure.Persistence;
using SeaLevel.Core.Entities;

var options = new DbContextOptionsBuilder<AppDbContext>().UseSqlite("Data Source=C:\\Users\\lyr1csan\\Desktop\\robotics\\Alexandria-Sea-Leval-Rise-Mitigation\\Backend\\SeaLevel.API\\sealevel.db").Options;
using var db = new AppDbContext(options);
foreach (var s in db.LongTermScenarios) {
    Console.WriteLine($"Scenario: {s.Scenario}, Year: {s.Year}, Rise: {s.RiseInMillimeters}");
}
