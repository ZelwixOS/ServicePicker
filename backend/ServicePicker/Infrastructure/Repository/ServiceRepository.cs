using Domain.Models;
using Domain.RepositoryInterfaces;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class ServiceRepository : BaseRepository, IServiceRepository
    {
        public ServiceRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Service CreateItem(Service category)
        {
            var entity = this.Context.Add(category);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Service> GetItems()
        {
            return this.Context.Services.Include(s => s.Category).AsQueryable();
        }

        public Service GetItem(Guid id)
        {
            var service = this.Context.Services
                .Include(s => s.Features)
                .Include(s => s.Category)
                .AsNoTracking()
                .FirstOrDefault(s => s.Id == id);

            return service;
        }

        public Service GetItem(string url)
        {
            var service = this.Context.Services
            .Include(s => s.Features)
            .FirstOrDefault(s => s.URL == url);

            return service;
        }

        public int DeleteItem(Service service)
        {
            if (this.GetItem(service.Id).Features.Count > 0)
            {
                return 0;
            }

            this.Context.Services.Remove(service);
            return this.Context.SaveChanges();
        }

        public Service UpdateItem(Service service)
        {
            var entity = this.Context.Services.Update(service);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
