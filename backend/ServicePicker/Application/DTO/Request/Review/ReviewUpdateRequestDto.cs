namespace Application.DTO.Request.Review
{
    using Domain.Models;

    public class ReviewUpdateRequestDto : ReviewRequestDto
    {
        public override Review ToModel()
        {
            return new Review()
            {
                ServiceId = this.ServiceId,
                Mark = this.Mark,
                Description = this.Description,
                Service = null,
                User = null,
            };
        }
    }
}
