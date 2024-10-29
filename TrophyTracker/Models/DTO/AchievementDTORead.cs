namespace TrophyTracker.Models.DTO
{
    public record AchievementDTORead(
        int ID,
        string? PlayerUsername,
        string? TrophyTitle,
        DateTime? DateAchieved
        );
    
}
