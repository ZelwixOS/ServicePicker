using Application.DTO.Request.Service;
using Application.DTO.Response;
using Application.Helpers;
using Application.Interfaces;
using Domain.Models;
using Domain.RepositoryInterfaces;
using System.Security.Policy;

namespace Application.Services
{
    public class ServiceService : IServiceService
    {
        private const string PicPath = "ClientApp/servicePics/";

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
            var service = this.serviceRepository.GetItem(url);

            if (service == null)
            {
                return null;
            }

            return new ServiceDto(service);
        }

        public ServiceDto GetService(Guid id)
        {
            var service = this.serviceRepository.GetItem(id);

            if (service == null)
            {
                return null;
            }

            return new ServiceDto(service);
        }

        public PaginatedData<ServiceDto> GetServices(int page, int itemsOnPage, string search, bool published)
        {
            if (search == "\"\"")
            {
                search = null;
            }

            var services = this.serviceRepository
            .GetItems()
                .Where(s => !published || s.Published)
                .Where(s => string.IsNullOrEmpty(search) || s.Name.Contains(search))
                .OrderByDescending(s => s.UserScore);
                
            var result = Paginator<Service>.ElementsOfPage(services, page, itemsOnPage);
            return new PaginatedData<ServiceDto>(result.Data.Select(s => new ServiceDto(s)).ToList(), result.CurrentPage, result.MaxPage);
        }

        public async Task<ServiceDto> CreateServiceAsync(ServiceCreateDto service, bool publish = false)
        {
            var serv = service.ToModel();
            if (publish)
            {
                serv.Published = true;
            }

            if (service.PicFile != null)
            {
                var format = service.PicFile.FileName.Substring(service.PicFile.FileName.LastIndexOf('.'));
                serv.PicURL = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + serv.PicURL))
                {
                    await service.PicFile.CopyToAsync(fs);
                }
            }
            else
            {
                serv.PicURL = string.Empty;
            }

            var res = this.serviceRepository.CreateItem(serv);
            return new ServiceDto(res);
        }

        public ServiceDto PublishService(Guid id)
        {
            var service = this.serviceRepository.GetItem(id);

            if (service != null)
            {
                service.Published = true;
                return new ServiceDto(this.serviceRepository.UpdateItem(service));
            }

            return null;
        }

        public ServiceDto UnpublishService(Guid id)
        {
            var service = this.serviceRepository.GetItem(id);

            if (service != null)
            {
                service.Published = false;
                return new ServiceDto(this.serviceRepository.UpdateItem(service));
            }

            return null;
        }

        public async Task<ServiceDto> UpdateServiceAsync(ServiceUpdateDto service)
        {
            var servEntity = serviceRepository.GetItem(service.Id);

            if (servEntity == null)
            {
                return null;
            }

            var serv = service.ToModel();
            serv.UserScore = servEntity.UserScore;
            serv.Popularity = servEntity.Popularity;
            serv.PicURL = servEntity.PicURL;

            if (service.PicFile != null)
            {
                var format = service.PicFile.FileName.Substring(service.PicFile.FileName.LastIndexOf('.'));
                serv.PicURL = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss") + Guid.NewGuid() + format;

                using (var fs = File.Create(PicPath + serv.PicURL))
                {
                    await service.PicFile.CopyToAsync(fs);
                }

                var file = PicPath + servEntity.PicURL;
                if (File.Exists(file))
                {
                    File.Delete(file);
                }
            }

            servEntity = null;

            var existingParams = featureRepository.GetItems(serv.Id);
            featureRepository.DeleteItems(existingParams);

            var serviceEntity = serviceRepository.UpdateItem(serv);

            return new ServiceDto(serviceEntity);
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
