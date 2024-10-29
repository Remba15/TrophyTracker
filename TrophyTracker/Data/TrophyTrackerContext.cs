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
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Trophy>().HasOne(t => t.Game);

            modelBuilder.Entity<Achievement>(entity =>
            {
                entity.HasOne(d => d.Player)
                    .WithMany(p => p.Achievements);

                entity.HasOne(d => d.Trophy)
                    .WithMany(p => p.Achievements);
            });

            

        }

    }
}
