using Domain.Models;
using Domain.RepositoryInterfaces;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class FeatureRepository : BaseRepository, IFeatureRepository
    {
        public FeatureRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Feature CreateItem(Feature feature)
        {
            var entity = this.Context.Add(feature);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Feature> GetItems()
        {
            return this.Context.Features.AsQueryable();
        }

        public IQueryable<Feature> GetItems(Guid id)
        {
            return this.Context.Features.Where(p => p.ServiceId == id).AsNoTracking();
        }

        public Feature GetItem(Guid id)
        {
            var feature = this.Context.Features
                .FirstOrDefault(s => s.Id == id);

            return feature;
        }


        public int DeleteItem(Feature Feature)
        {
            this.Context.Features.Remove(Feature);
            return this.Context.SaveChanges();
        }

        public int DeleteItems(IQueryable<Feature> features)
        {
            this.Context.Features.RemoveRange(features);
            return this.Context.SaveChanges();
        }

        public Feature UpdateItem(Feature Feature)
        {
            var entity = this.Context.Features.Update(Feature);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
