namespace TrophyTracker.Models
{
    public class User : Identity
    {

        public string? Email { get; set; }
        public string? _Password { get; set; }

    }
}
