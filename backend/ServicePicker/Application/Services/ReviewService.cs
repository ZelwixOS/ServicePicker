namespace Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Application.DTO.Request.Review;
    using Application.DTO.Response;
    using Application.Interfaces;
    using Domain.RepositoryInterfaces;

    public class ReviewService : IReviewService
    {
        private IServiceRepository _serviceRepository;
        private IReviewRepository _reviewRepository;
        private IUserRepository _userRepository;

        public ReviewService(IReviewRepository reviewRepository, IUserRepository userRepository, IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
        }

        public List<ReviewDto> GetServiceReviews(Guid serviceId)
        {
            var reviews = _reviewRepository.GetItems().Where(r => r.ServiceId == serviceId && r.Description != null && r.Description.Length > 0 && !r.Banned);
            var users = _userRepository.GetItems();

            return reviews.Select(r => new ReviewDto(r, r.User)).ToList();
        }

        public ReviewDto CreateReview(ReviewCreateRequestDto review, Guid userId)
        {
            var service = _serviceRepository.GetItem(review.ServiceId);

            if (service == null)
            {
                return null;
            }

            service.UserScore = ((service.UserScore * service.Popularity) + review.Mark) / (service.Popularity + 1);
            service.Popularity++;

            _serviceRepository.UpdateItem(service);

            var reviewEntity = review.ToModel();
            reviewEntity.UserId = userId;

            var usr = _userRepository.GetItem(userId);

            var result = _reviewRepository.CreateItem(reviewEntity);
            return result != null ? new ReviewDto(result, usr) : null;
        }

        public ReviewDto UpdateReview(ReviewUpdateRequestDto review, Guid userId)
        {
            var reviewEntity = _reviewRepository.GetItem(review.ServiceId, userId);

            if (reviewEntity == null)
            {
                return null;
            }

            var service = _serviceRepository.GetItem(review.ServiceId);
            service.UserScore = ((service.UserScore * service.Popularity) - reviewEntity.Mark + review.Mark) / service.Popularity;

            reviewEntity.Mark = review.Mark;
            reviewEntity.Description = review.Description;

            _serviceRepository.UpdateItem(service);

            var result = _reviewRepository.UpdateItem(reviewEntity);
            return result != null ? new ReviewDto(result, result.User) : null;
        }

        public int DeleteReview(Guid serviceId, Guid userId)
        {
            var review = _reviewRepository.GetItem(serviceId, userId);
            if (review != null)
            {
                var service = _serviceRepository.GetItem(review.ServiceId);
                service.UserScore = ((service.UserScore * service.Popularity) - review.Mark) / (service.Popularity - 1);
                service.Popularity--;

                _serviceRepository.UpdateItem(service);

                _reviewRepository.DeleteItem(review);
                return 1;
            }

            return 0;
        }

        public int BanReview(Guid id)
        {
            var review = _reviewRepository.GetItem(id);
            if (review == null)
            {
                return 0;
            }

            review.Banned = true;
            review = _reviewRepository.UpdateItem(review);

            return review == null ? 0 : 1;
        }
    }
}
