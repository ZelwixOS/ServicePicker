using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EF
{
    public class DatabaseContextFactory
    {
        public DatabaseContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new DatabaseContext(optionsBuilder.Options);
        }
    }
}
