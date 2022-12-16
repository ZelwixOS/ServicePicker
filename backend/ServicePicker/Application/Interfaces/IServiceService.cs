using Application.DTO.Request.Service;
using Application.DTO.Response;

namespace Application.Interfaces
{
    public interface IServiceService
    {
        ServiceDto CreateService(ServiceCreateDto service);
        int DeleteService(Guid id);
        ServiceDto GetService(string url);
        List<ServiceDto> GetServices();
        PaginatedData<ServiceDto> GetServices(int page, int itemsOnPage);
        ServiceDto UpdateService(ServiceUpdateDto service);
    }
}