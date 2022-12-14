namespace Domain.Models
{
    using System;

    public class Review
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid ServiceId { get; set; }

        public double Mark { get; set; }

        public string Description { get; set; }

        public User User { get; set; }

        public Service Service { get; set; }

        public bool Banned { get; set; }
    }
}
