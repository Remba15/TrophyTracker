namespace TrophyTracker.Models
{
    public class Player : Identity
    {

        public string? Username { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string? Region { get; set; }

        //public ICollection<Game>? Games { get; set; }

        public override string ToString()
        {
            return "Username: " + this.Username + " | Region: " + this.Region + " | Date registered: " + this.RegistrationDate.Value.ToString("dd.MM.yyyy");
        }

    }
}
