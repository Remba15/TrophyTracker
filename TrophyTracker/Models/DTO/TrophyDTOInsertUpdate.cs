using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record TrophyDTOInsertUpdate(
        int Id,
        [Required(ErrorMessage = "Title required")]
        string Title,
        string? Description,
        Game? Game,
        string? TrophyType
        );
    
}
