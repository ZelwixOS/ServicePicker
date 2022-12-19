using Domain.Models;

namespace Domain.RepositoryInterfaces
{
    public interface IServiceRepository : IRepository<Service, Guid>
    {
        public Service GetItem(string url);
        Service GetItem(Guid id);
    }
}
