using Microsoft.EntityFrameworkCore;
using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.EF
{
    public class DatabaseContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
                 : base(options)
        {
        }

        public DbSet<Service> Services { get; set; }

        public DbSet<Feature> Features { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Service>().HasKey(s => s.Id);

            modelBuilder.Entity<Feature>(entity =>
            {
                entity.HasOne(f => f.Service).WithMany(s => s.Features).HasForeignKey(f => f.ServiceId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
