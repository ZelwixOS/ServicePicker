using Application.DTO.Request.Feature;
using Application.DTO.Request.Service;
using Application.DTO.Response;
using Application.Helpers;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace ServicePicker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        private readonly ILogger<ServiceController> logger;

        private readonly IFeatureService featureService;

        public FeatureController(ILogger<ServiceController> logger, IFeatureService featureService)
        {
            this.logger = logger;
            this.featureService = featureService;
        }


        [HttpGet("{id}")]
        public ActionResult<List<FeatureDto>> GetFeatures(Guid id)
        {
            return this.Ok(this.featureService.GetFeatures(id));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Create([FromBody] FeatureCreateDto feature)
        {
            return this.Ok(this.featureService.CreateFeature(feature));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.featureService.DeleteFeature(id));
        }
    }
}
