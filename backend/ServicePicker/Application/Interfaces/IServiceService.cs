using Application.DTO.Request.Service;
using Application.DTO.Response;

namespace Application.Interfaces
{
    public interface IServiceService
    {
        Task<ServiceDto> CreateServiceAsync(ServiceCreateDto service, bool publish = false);
        int DeleteService(Guid id);
        ServiceDto GetService(string url);
        ServiceDto GetService(Guid id);
        List<ServiceDto> GetServices();
        PaginatedData<ServiceDto> GetServices(int page, int itemsOnPage, string search, bool published);
        ServiceDto PublishService(Guid id);
        ServiceDto UnpublishService(Guid id);
        Task<ServiceDto> UpdateServiceAsync(ServiceUpdateDto service);
    }
}