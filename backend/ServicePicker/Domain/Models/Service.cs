using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Service
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string URL { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        [MaxLength(150)]
        public string PicURL { get; set; }

        [DefaultValue(0.0)]
        public double UserScore { get; set; }

        [Required]
        public int Popularity { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool Published { get; set; }

        public Guid CategoryId { get; set; }

        public Category Category { get; set; }

        public HashSet<Feature> Features { get; set; }

        public HashSet<Review> Reviews { get; set; }
    }
}
