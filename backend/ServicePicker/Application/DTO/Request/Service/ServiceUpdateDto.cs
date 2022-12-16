namespace Application.DTO.Request.Service
{
    public class ServiceUpdateDto : ServiceRequestDto
    {
        public Guid Id { get; set; }

        public override Domain.Models.Service ToModel()
        {
            var service = new Domain.Models.Service()
            {
                Id = this.Id,
                Name = this.Name,
                Description = this.Description,
                PicURL = this.PicUrl,
                URL = this.Url,
            };

            return service;
        }
    }
}
