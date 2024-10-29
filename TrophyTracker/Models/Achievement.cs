using System.ComponentModel.DataAnnotations.Schema;

namespace TrophyTracker.Models
{
    public class Achievement : Identity
    {
        [ForeignKey("PlayerID")]
        public Player Player { get; set; }
        [ForeignKey("TrophyID")]
        public Trophy Trophy { get; set; }
        public DateTime DateAchieved { get; set; }

    }
}
