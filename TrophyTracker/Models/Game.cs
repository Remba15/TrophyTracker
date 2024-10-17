using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TrophyTracker.Models
{
    public class Game : Identity
    {

        public string? Title { get; set; }
        public string? Developer { get; set; }
        [Column("GamePlatform")]
        public string? Platform { get; set; }
        [Column("GameDescription")]
        public string? Description { get; set; }
        public string? CoverImage { get; set; }

        public override string ToString()
        {
            return this.Title + " - Developed by " + this.Developer + " for " + this.Platform;
        }

    }
}
