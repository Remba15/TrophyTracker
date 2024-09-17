namespace TrophyTracker.Models
{
    public class Trophy : Identity
    {

        public string? Title { get; set; }
        public string? Description { get; set; }
        public Game GameID { get; set; }
        public string? TrophyType { get; set; }

        public override string ToString()
        {
            return "Type: " + this.TrophyType + "|" + "Title: " + this.Title + "|" + this.Description;
        }

    }
}
