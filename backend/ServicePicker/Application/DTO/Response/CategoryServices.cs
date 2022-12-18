using Domain.Models;
using System.Linq;

namespace Application.DTO.Response
{
    public class CategoryServices
    {
        public CategoryServices(Category category, PaginatedData<Service> services)
        {
            category.Services = null;
            this.Category = new CategoryDto(category);
            this.PaginatedServices = new PaginatedData<ServiceDto>(services?.Data.Select(s => new ServiceDto(s)).ToList(), services.CurrentPage, services.MaxPage);
        }

        public CategoryDto Category { get; set; }
        public PaginatedData<ServiceDto> PaginatedServices { get; set; }
    }
}
