using Microsoft.EntityFrameworkCore;
using TrophyTracker.Models;

namespace TrophyTracker.Data
{
    public class TrophyTrackerContext : DbContext
    {

        public TrophyTrackerContext(DbContextOptions<TrophyTrackerContext> options) : base(options)
        {

        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Trophy> Trophies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Trophy>().HasOne(t => t.Game);

        }

    }
}
