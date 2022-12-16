using Domain.Models;

namespace Application.DTO.Response
{
    public class FeatureDto
    {
        public FeatureDto(Feature feature)
        {
            this.Id = feature.Id;
            this.Value = feature.Value;

            if (feature.Service != null)
            {
                this.ServiceName = feature.Service.Name;
                this.Url = feature.Service.URL;
            }
        }

        public Guid Id { get; set; }

        public string Value { get; set; }

        public string ServiceName { get; set; }

        public string Url { get; set; }
    }
}
