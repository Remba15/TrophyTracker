using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record TrophyDTOInsertUpdate(
        [Required(ErrorMessage = "Title required")]
        string Title,
        string? TrophyDescription,
        int? GameID,
        string? TrophyType
        );
    
}
