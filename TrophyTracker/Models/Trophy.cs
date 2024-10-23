using System.ComponentModel.DataAnnotations.Schema;

namespace TrophyTracker.Models
{
    public class Trophy : Identity
    {

        public string? Title { get; set; }
        public string? TrophyDescription { get; set; }
        [ForeignKey("game")]
        public required Game Game { get; set; }
        public string? TrophyType { get; set; }
        public override string ToString()
        {
            return "Type: " + this.TrophyType + "|" + "Title: " + this.Title + "|" + this.TrophyDescription;
        }

    }
}
