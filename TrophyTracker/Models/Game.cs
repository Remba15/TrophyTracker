using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TrophyTracker.Models
{
    public class Game : Identity
    {

        public string? Title { get; set; }
        public string? Developer { get; set; }
        public string? GamePlatform { get; set; }
        public string? GameDescription { get; set; }

        public override string ToString()
        {
            return this.Title + " - Developed by " + this.Developer + " for " + this.GamePlatform;
        }

    }
}
