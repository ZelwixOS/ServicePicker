using Infrastructure.EF;

namespace Infrastructure.Interfaces
{
    public interface IDatabaseContextFactory
    {
        public DatabaseContext CreateDbContext(string connectionString);
    }
}
