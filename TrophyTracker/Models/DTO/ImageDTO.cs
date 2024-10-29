using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record ImageDTO(

        [Required(ErrorMessage = "Base64 image record!")]
        string Base64

        );
}
