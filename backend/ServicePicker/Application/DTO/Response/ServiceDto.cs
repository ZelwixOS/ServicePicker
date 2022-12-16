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
                            this.Neutral.Add(feature.Value);
                            break;
                        case FeatureType.Neutral:
                            this.Negative.Add(feature.Value);
                            break;
                    }
                }
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<string> Positive { get; set; } = new List<string>();

        public List<string> Neutral { get; set; } = new List<string>();

        public List<string> Negative { get; set; } = new List<string>();
    }
}
