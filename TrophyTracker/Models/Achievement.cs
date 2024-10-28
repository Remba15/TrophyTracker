using System.ComponentModel.DataAnnotations.Schema;

namespace TrophyTracker.Models
{
    public class Achievement : Identity
    {
        [ForeignKey("player")]
        public Player Player { get; set; }
        [ForeignKey("trophy")]
        public Trophy Trophy { get; set; }
        public DateTime DateAchieved { get; set; }

    }
}
