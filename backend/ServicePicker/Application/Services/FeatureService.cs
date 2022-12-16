using Application.DTO.Request.Feature;
using Application.DTO.Response;
using Application.Interfaces;
using Domain.RepositoryInterfaces;

namespace Application.Services
{
    public class FeatureService : IFeatureService
    {
        private IFeatureRepository featureRepository;

        public FeatureService(IFeatureRepository featureRepository)
        {
            this.featureRepository = featureRepository;
        }

        public List<FeatureDto> GetFeatures(Guid serviceId)
        {
            return this.featureRepository.GetItems().Where(f => f.ServiceId == serviceId).Select(x => new FeatureDto(x)).ToList();
        }

        public FeatureDto CreateFeature(FeatureCreateDto feature)
        {
            return new FeatureDto(this.featureRepository.CreateItem(feature.ToModel()));
        }

        public int DeleteFeature(Guid id)
        {
            var feature = this.featureRepository.GetItem(id);
            if (feature != null)
            {
                return this.featureRepository.DeleteItem(feature);
            }

            return 0;
        }
    }
}
