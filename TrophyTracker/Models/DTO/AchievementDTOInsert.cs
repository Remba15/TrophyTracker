using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models.DTO
{
    public record AchievementDTOInsert(
        [Required(ErrorMessage = "Player ID required!")]
        int Player_ID,
        [Required(ErrorMessage = "Trophy ID required!")]
        int Trophy_ID,
        DateTime DateAchieved
        );
    
}
