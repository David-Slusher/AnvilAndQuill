using Microsoft.EntityFrameworkCore;
using AnvilAndQuill.Models;

namespace AnvilAndQuill.Data
{
    public class MonsterDbContext : DbContext
    {
        public MonsterDbContext(DbContextOptions<MonsterDbContext> options)
            : base(options)
        {
        }
        public DbSet<Monster> Monsters { get; set; } = null!;
        public DbSet<MonsterBand> MonsterBands { get; set; } = null!;
    }
}
