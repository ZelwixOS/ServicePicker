namespace Application.DTO.Request.Service
{
    public class ServiceRequestDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string PicUrl { get; set; }

        public string Url { get; set; }

        public virtual Domain.Models.Service ToModel()
        {
            var service = new Domain.Models.Service()
            {
                Name = this.Name,
                Description = this.Description,
                PicURL = this.PicUrl,
                URL = this.Url,
            };

            return service;
        }
    }
}
