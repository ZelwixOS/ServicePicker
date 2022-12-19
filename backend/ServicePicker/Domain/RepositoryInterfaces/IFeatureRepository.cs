using Domain.Models;

namespace Domain.RepositoryInterfaces
{
    public interface IFeatureRepository : IRepository<Feature, Guid>
    {
        IQueryable<Feature> GetItems(Guid id);

        int DeleteItems(IQueryable<Feature> parameters);
    }
}
