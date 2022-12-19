using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Application.DTO.Request.Service
{
    public class ServiceRequestDto : IDtoMapper<Domain.Models.Service>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid CategoryId { get; set; }

        public IFormFile? PicFile { get; set; }

        public string Url { get; set; }

        public virtual Domain.Models.Service ToModel()
        {
            var service = new Domain.Models.Service()
            {
                Name = this.Name,
                Description = this.Description,
                CategoryId = this.CategoryId,
                URL = this.Url,
            };

            return service;
        }
    }
}
