namespace Application.DTO.Response
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Domain.Models;

    public class CategoryDto : IComparable
    {
        public CategoryDto(Category category)
        {
            this.Id = category.Id;
            this.Name = category.Name;
            this.Description = category.Description;
            this.Services = category.Services?.Select(p => new ServiceDto(p)).ToHashSet();
        }

        public CategoryDto()
        {
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public HashSet<ServiceDto> Services { get; set; }

        public int CompareTo(object obj)
        {
            if (obj is CategoryDto expected)
            {
                if (expected.Name == this.Name && expected.Description == this.Description)
                {
                    if (this.Id == expected.Id)
                    {
                        return 0;
                    }
                    else
                    {
                        return 1;
                    }
                }
            }

            return -1;
        }
    }
}
