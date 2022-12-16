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

        [Required]
        [DefaultValue(false)]
        public bool Published { get; set; }

        public HashSet<Feature> Features { get; set; }
    }
}
