using Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace Application.DTO.Request.Feature
{
    public class FeatureRequestDto
    {
        [Required]
        [MinLength(5)]
        [MaxLength(200)]
        public string Value { get; set; }

        [Required]
        public FeatureType FeatureType { get; set; }

        [Required]
        public Guid ServiceId { get; set; }

        public virtual Domain.Models.Feature ToModel()
        {
            var service = new Domain.Models.Feature()
            {
                Value = this.Value,
                FeatureType = this.FeatureType,
                ServiceId = this.ServiceId,
            };

            return service;
        }
    }
}
