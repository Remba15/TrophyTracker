namespace TrophyTracker.Models.DTO
{
    public record TrophyDTORead(
        int ID,
        string Title,
        string? TrophyDescription,
        string? GameTitle,
        string? TrophyType

        );
    
}
