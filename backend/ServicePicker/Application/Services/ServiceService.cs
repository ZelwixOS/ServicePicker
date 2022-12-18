using Application.DTO.Request.Service;
using Application.DTO.Response;
using Application.Helpers;
using Application.Interfaces;
using Domain.RepositoryInterfaces;

namespace Application.Services
{
    public class ServiceService : IServiceService
    {
        private IServiceRepository serviceRepository;
        private IFeatureRepository featureRepository;

        public ServiceService(IServiceRepository serviceRepository, IFeatureRepository featureRepository)
        {
            this.serviceRepository = serviceRepository;
            this.featureRepository = featureRepository;
        }

        public List<ServiceDto> GetServices()
        {
            return this.serviceRepository.GetItems().Select(x => new ServiceDto(x)).ToList();
        }

        public ServiceDto GetService(string url)
        {
            return new ServiceDto(this.serviceRepository.GetItem(url));
        }

        public PaginatedData<ServiceDto> GetServices(int page, int itemsOnPage, string search)
        {
            if (search == "\"\"")
            {
                search = null;
            }

            var services = this.serviceRepository.GetItems().Where(s => s.Published).Where(s => string.IsNullOrEmpty(search) || s.Name.Contains(search)).Select(s => new ServiceDto(s));
            var result = Paginator<ServiceDto>.ElementsOfPage(services, page, itemsOnPage);
            return result;
        }

        public ServiceDto CreateService(ServiceCreateDto service)
        {
            return new ServiceDto(this.serviceRepository.CreateItem(service.ToModel()));
        }

        public ServiceDto PublishService(string url)
        {
            var service = this.serviceRepository.GetItem(url);

            if (service != null)
            {
                service.Published = true;
                return new ServiceDto(this.serviceRepository.UpdateItem(service));
            }

            return null;
        }

        public ServiceDto UnpublishService(string url)
        {
            var service = this.serviceRepository.GetItem(url);

            if (service != null)
            {
                service.Published = false;
                return new ServiceDto(this.serviceRepository.UpdateItem(service));
            }

            return null;
        }

        public ServiceDto UpdateService(ServiceUpdateDto service)
        {
            return new ServiceDto(this.serviceRepository.UpdateItem(service.ToModel()));
        }

        public int DeleteService(Guid id)
        {
            var service = this.serviceRepository.GetItem(id);

            if (service != null)
            {
                if (service.Features != null && service.Features.Count > 0)
                {
                    foreach (var feature in service.Features)
                    {
                        this.featureRepository.DeleteItem(feature);
                    }
                }

                return this.serviceRepository.DeleteItem(service);
            }
            else
            {
                return 0;
            }
        }
    }
}
