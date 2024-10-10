namespace TrophyTracker.Models.DTO
{
    public record TrophyDTORead(
        int Id,
        string Title,
        string? Description,
        Game? Game,
        string? TrophyType

        );
    
}
