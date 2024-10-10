using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record GameDTOInsertUpdate(
        [Required(ErrorMessage = "Title required")]
        string Title,
        string? Developer,
        string? GamePlatform,
        string? GameDescription
        );
}
