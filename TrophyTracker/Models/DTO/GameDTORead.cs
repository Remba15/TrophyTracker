namespace TrophyTracker.Models.DTO
{
    public record GameDTORead(
        int Id,
        string Title,
        string? Developer,
        string? GamePlatform,
        string? GameDescription
        );
    
}
