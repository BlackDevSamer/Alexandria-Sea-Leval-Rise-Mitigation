using System.ComponentModel.DataAnnotations;

namespace SeaLevel.Application.DTOs.Users;

public class UserProfileUpdateRequest
{
    [Required]
    public string Username { get; set; } = string.Empty;
}
