using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record UserDTO(
        [Required(ErrorMessage = "Email is mandatory.")]
            string? Email,
        [Required(ErrorMessage = "Password is mandatory")]
            string? _Password
        
        );


}
