namespace Infrastructure.Repository
{
    using System;
    using System.Linq;
    using Domain.Models;
    using Domain.RepositoryInterfaces;
    using Infrastructure.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class CategoryRepository : BaseRepository, ICategoryRepository, IDisposable
    {
        public CategoryRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Category CreateItem(Category category)
        {
            var entity = this.Context.Add(category);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Category> GetItems()
        {
            return this.Context.Categories.AsNoTracking();
        }

        public Category GetItem(Guid id)
        {
            var category = this.Context.Categories
                .Include(c => c.Services)
                .FirstOrDefault(c => c.Id == id);

            return category;
        }

        public Category GetItem(string name)
        {
            var category = this.Context.Categories
                .AsNoTracking()
                .FirstOrDefault(c => c.Name == name);

            return category;
        }

        public int DeleteItem(Category category)
        {
            if (this.GetItem(category.Id).Services.Count > 0)
            {
                return 0;
            }

            this.Context.Categories.Remove(category);
            return this.Context.SaveChanges();
        }

        public Category UpdateItem(Category category)
        {
            var entity = this.Context.Categories.Update(category);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
