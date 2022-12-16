using Application.DTO.Request.Feature;
using Application.DTO.Response;

namespace Application.Interfaces
{
    public interface IFeatureService
    {
        FeatureDto CreateFeature(FeatureCreateDto feature);
        int DeleteFeature(Guid id);
        List<FeatureDto> GetFeatures(Guid serviceId);
    }
}