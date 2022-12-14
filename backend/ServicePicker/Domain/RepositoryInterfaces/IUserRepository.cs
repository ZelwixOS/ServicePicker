namespace Domain.RepositoryInterfaces
{
    using System;
    using System.Linq;
    using Domain.Models;

    public interface IUserRepository
    {
        public IQueryable<User> GetItems();

        public User GetItem(Guid id);

        public User UpdateUser(User user);
    }
}
