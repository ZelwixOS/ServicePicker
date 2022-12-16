using Domain.Models;

namespace Application.DTO.Response
{
    public class ServiceDto
    {
        public ServiceDto(Service service)
        {
            this.Id = service.Id;
            this.Name = service.Name;
            this.Description = service.Description;
            this.Url = service.URL;
            this.PicUrl = service.PicURL;

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

        public string Url { get; set; }

        public string PicUrl { get; set; }

        public string Description { get; set; }

        public List<string> Positive { get; set; } = new List<string>();

        public List<string> Neutral { get; set; } = new List<string>();

        public List<string> Negative { get; set; } = new List<string>();
    }
}
