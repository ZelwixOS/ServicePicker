namespace Application.DTO.Response.Account
{
    using System;
    using Domain.Models;

    public class UserInfo
    {
        public UserInfo(User user, string role)
        {
            this.UserName = user.UserName;
            this.Role = role;
            this.PhoneNumber = user.PhoneNumber;
            this.Email = user.Email;
        }

        public UserInfo(User user)
        {
            this.Id = user.Id;
            this.UserName = user.UserName;
            this.PhoneNumber = user.PhoneNumber;
            this.Email = user.Email;
            this.Banned = user.Banned;
        }

        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string Role { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public bool Banned { get; set; }
    }
}