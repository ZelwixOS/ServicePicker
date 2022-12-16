using Domain.Models;

namespace Application.DTO.Request.Service
{
    public class ServiceCreateDto : ServiceRequestDto
    {
        public List<string> Positive { get; set; } = new List<string>();

        public List<string> Neutral { get; set; } = new List<string>();

        public List<string> Negative { get; set; } = new List<string>();

        public override Domain.Models.Service ToModel()
        {
            var service = new Domain.Models.Service()
            {
                Name = this.Name,
                Description = this.Description,
                PicURL = this.PicUrl,
                URL = this.Url,
            };

            service.Features =
                this.Positive.Select(x =>
                new Feature()
                {
                    FeatureType = FeatureType.Positive,
                    Value = x,
                    Service = service
                }).Union(this.Negative.Select(x =>
                new Feature()
                {
                    FeatureType = FeatureType.Positive,
                    Value = x,
                    Service = service
                })).Union(this.Neutral.Select(x =>
                new Feature()
                {
                    FeatureType = FeatureType.Neutral,
                    Value = x,
                    Service = service
                })).ToHashSet();

            return service;
        }
    }
}
