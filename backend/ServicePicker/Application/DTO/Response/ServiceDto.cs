using Domain.Models;

namespace Application.DTO.Response
{
    public class ServiceDto
    {
        public ServiceDto(Service service)
        {
            this.Id = service.Id;
            this.Name = service.Name;
            this.UserScore = service.UserScore;
            this.Description = service.Description;
            this.Url = service.URL;
            this.PicUrl = service.PicURL;
            this.Popularity = service.Popularity;
            this.Published = service.Published;

            if (service.Category != null)
            {
                service.Category.Services = null;
                this.Category = new CategoryDto(service.Category);
            }

            if (service.Features!= null)
            {
                foreach(Feature feature in service.Features)
                {
                    switch(feature.FeatureType)
                    {
                        case FeatureType.Positive:
                            this.Positive.Add(feature.Value);
                            break;
                        case FeatureType.Negative:
                            this.Negative.Add(feature.Value);
                            break;
                        case FeatureType.Neutral:
                            this.Neutral.Add(feature.Value);
                            break;
                    }
                }
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public double UserScore { get; set; }

        public double Popularity { get; set; }

        public string Url { get; set; }

        public bool Reviewed { get; set; }

        public bool Published { get; set; }

        public string PicUrl { get; set; }

        public string Description { get; set; }

        public CategoryDto Category { get; set; }

        public List<string> Positive { get; set; } = new List<string>();

        public List<string> Neutral { get; set; } = new List<string>();

        public List<string> Negative { get; set; } = new List<string>();
    }
}
