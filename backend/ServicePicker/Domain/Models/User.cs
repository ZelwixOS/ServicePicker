namespace Domain.Models
{
    using Microsoft.AspNetCore.Identity;
    using System;

    public class User : IdentityUser<Guid>
    {
        public bool Banned { get; set; }
    }
}
