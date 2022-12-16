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
        ServiceDto PublishService(string url);
        ServiceDto UnpublishService(string url);
        ServiceDto UpdateService(ServiceUpdateDto service);
    }
}