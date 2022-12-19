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
        private IAccountService accountService;
        private IReviewService reviewService;

        public ServiceController(
            ILogger<ServiceController> logger,
            IServiceService serviceService,
            IReviewService reviewService,
            IAccountService accountService)
        {
            this.logger = logger;
            this.serviceService = serviceService;
            this.accountService = accountService;
            this.reviewService = reviewService;
        }

        [HttpGet]
        public ActionResult<PaginatedData<ServiceDto>> GetPublishedServices([FromQuery] int page, int itemsOnPage, string? search)
        {
            var paged = this.serviceService.GetServices(page, itemsOnPage, search, true);
            return this.Ok(paged);
        }

        [HttpGet("all")]
        public ActionResult<PaginatedData<ServiceDto>> GetAllServices([FromQuery] int page, int itemsOnPage, string? search)
        {
            var paged = this.serviceService.GetServices(page, itemsOnPage, search, false);
            return this.Ok(paged);
        }


        [HttpGet("url/{url}")]
        public async Task<ActionResult<ServiceDto>> GetPublishedServicesAsync(string url)
        {
            var service = this.serviceService.GetService(url);
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);

            if (user != null && service != null)
            {
                service.Reviewed = this.reviewService.GetServiceReviews(service.Id).Any(r => r.UserName == user.UserName);
            }

            return this.Ok(service);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ServiceDto>> GetPublishedServicesAsync(Guid id)
        {
            var service = this.serviceService.GetService(id);
            var user = await this.accountService.GetCurrentUserAsync(HttpContext);

            if (user != null && service != null)
            {
                service.Reviewed = this.reviewService.GetServiceReviews(service.Id).Any(r => r.UserName == user.UserName);
            }

            return this.Ok(service);
        }


        [HttpPost("createpublish")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<ServiceDto>> CreateAndPublishAsync([FromForm] ServiceCreateDto block)
        {
            return this.Ok(await this.serviceService.CreateServiceAsync(block, true));
        }

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<ServiceDto>> CreateAsync([FromForm] ServiceCreateDto block)
        {
            return this.Ok(await this.serviceService.CreateServiceAsync(block));
        }

        [HttpPost]
        [Route("publish/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Publish(Guid id)
        {
            return this.Ok(this.serviceService.PublishService(id));
        }

        [HttpPost]
        [Route("unpublish/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Unpublish(Guid id)
        {
            return this.Ok(this.serviceService.UnpublishService(id));
        }

        [HttpPut]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<ServiceDto>> UpdateAsync([FromForm] ServiceUpdateDto block)
        {
            return this.Ok(await this.serviceService.UpdateServiceAsync(block));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Delete(Guid id)
        {
            return this.Ok(this.serviceService.DeleteService(id));
        }
    }
}
