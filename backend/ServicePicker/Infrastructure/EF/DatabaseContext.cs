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

        public DbSet<Category> Categories { get; set; }

        public DbSet<Feature> Features { get; set; }

        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasOne(s => s.Category).WithMany(c => c.Services).HasForeignKey(f => f.CategoryId);
                entity.HasKey(s => s.Id);
            });

            modelBuilder.Entity<Feature>(entity =>
            {
                entity.HasOne(f => f.Service).WithMany(s => s.Features).HasForeignKey(f => f.ServiceId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasOne(s => s.Service).WithMany(s => s.Reviews).HasForeignKey(r => r.ServiceId);
                entity.HasOne(p => p.User).WithMany(t => t.Reviews).HasForeignKey(p => p.UserId);
                entity.HasKey(p => p.Id);
            });

            modelBuilder.Entity<Category>().HasKey(c => c.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
