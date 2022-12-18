namespace Application.DTO.Request.Review
{
    using System;
    using Application.Interfaces;
    using Domain.Models;

    public abstract class ReviewRequestDto : IDtoMapper<Review>
    {
        public Guid ServiceId { get; set; }

        public double Mark { get; set; }

        public string Description { get; set; }

        public abstract Review ToModel();
    }
}
