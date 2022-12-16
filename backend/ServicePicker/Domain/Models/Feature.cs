using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Feature
    {
        public Guid Id { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(200)]
        public string Value { get; set; }

        public FeatureType FeatureType { get; set; }

        public Guid ServiceId { get; set; }

        public Service Service { get; set; }
    }
}
