using System.ComponentModel.DataAnnotations.Schema;

namespace TrophyTracker.Models
{
    public class Trophy : Identity
    {

        public string? Title { get; set; }
        [Column("TrophyDescription")]
        public string? Description { get; set; }
        [ForeignKey("game")]
        [Column("Game_ID")]
        public Game GameID { get; set; }
        public string? TrophyType { get; set; }
        [Column("TrophyIcon")]
        public string? Icon { get; set; }

        public override string ToString()
        {
            return "Type: " + this.TrophyType + "|" + "Title: " + this.Title + "|" + this.Description;
        }

    }
}
