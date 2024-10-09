using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record PlayerDTOInsertUpdate(
        [Required(ErrorMessage = "Username required")]
        string Username,
        DateTime? RegistrationDate,
        string? Region
        );
    
}
