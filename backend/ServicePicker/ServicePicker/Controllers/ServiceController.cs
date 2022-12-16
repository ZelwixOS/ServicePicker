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
    public class ServiceController : ControllerBase
    {
        private readonly ILogger<ServiceController> logger;

        private readonly IServiceService serviceService;

        public ServiceController(ILogger<ServiceController> logger, IServiceService serviceService)
        {
            this.logger = logger;
            this.serviceService = serviceService;
        }

        [HttpGet]
        public ActionResult<PaginatedData<ServiceDto>> GetPublishedServices(int page, int itemsOnPage)
        {
            var paged = this.serviceService.GetServices(page, itemsOnPage);
            return this.Ok(paged);
        }

        [HttpGet("{url}")]
        public ActionResult<ServiceDto> GetPublishedServices(string url)
        {
            return this.Ok(this.serviceService.GetService(url));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Create([FromBody]ServiceCreateDto block)
        {
            return this.Ok(this.serviceService.CreateService(block));
        }

        [HttpPost]
        [Route("Publish")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Publish(string url)
        {
            return this.Ok(this.serviceService.PublishService(url));
        }


        [HttpPost]
        [Route("Unpublish")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Unpublish(string url)
        {
            return this.Ok(this.serviceService.UnpublishService(url));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Update([FromBody]ServiceUpdateDto block)
        {
            return this.Ok(this.serviceService.UpdateService(block));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.serviceService.DeleteService(id));
        }
    }
}
