namespace Application.DTO.Request.Review
{
    using Domain.Models;

    public class ReviewCreateRequestDto : ReviewRequestDto
    {
        public override Review ToModel()
        {
            return new Review()
            {
                ServiceId = this.ServiceId,
                Description = this.Description,
                Mark = this.Mark,
                Service = null,
                User = null,
            };
        }
    }
}
