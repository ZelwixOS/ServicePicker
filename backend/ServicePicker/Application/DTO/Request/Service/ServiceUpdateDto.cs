using Domain.Models;
using System.Text.Json;

namespace Application.DTO.Request.Service
{
    public class ServiceUpdateDto : ServiceRequestDto
    {
        public Guid Id { get; set; }

        public string Positive { get; set; }

        public string Neutral { get; set; }

        public string Negative { get; set; }

        public override Domain.Models.Service ToModel()
        {
            var service = new Domain.Models.Service()
            {
                Id = this.Id,
                CategoryId = this.CategoryId,
                Name = this.Name,
                Description = this.Description,
                URL = this.Url,
            };

            var positive = JsonSerializer.Deserialize<string[]>(this.Positive);
            var neutral = JsonSerializer.Deserialize<string[]>(this.Neutral);
            var negative = JsonSerializer.Deserialize<string[]>(this.Negative);

            service.Features =
                positive.Select(x =>
                new Domain.Models.Feature()
                {
                    FeatureType = FeatureType.Positive,
                    Value = x,
                    Service = service
                }).Union(neutral.Select(x =>
                new Domain.Models.Feature()
                {
                    FeatureType = FeatureType.Neutral,
                    Value = x,
                    Service = service
                })).Union(negative.Select(x =>
                new Domain.Models.Feature()
                {
                    FeatureType = FeatureType.Negative,
                    Value = x,
                    Service = service
                })).ToHashSet();

            return service;
        }
    }
}
