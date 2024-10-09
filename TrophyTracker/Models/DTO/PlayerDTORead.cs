namespace TrophyTracker.Models.DTO
{
    public record PlayerDTORead(
        int Id,
        string Username,
        DateTime? RegistrationDate,
        string? Region
        );
}
