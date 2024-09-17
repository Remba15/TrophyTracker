using System.ComponentModel.DataAnnotations;

namespace TrophyTracker.Models
{
    public abstract class Identity
    {

        [Key]
        public int ID { get; set; }

    }
}
