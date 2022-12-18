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
        public ActionResult<PaginatedData<ServiceDto>> GetPublishedServices(int page, int itemsOnPage, string search)
        {
            var paged = this.serviceService.GetServices(page, itemsOnPage, search);
            return this.Ok(paged);
        }

        [HttpGet("{url}")]
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

        [HttpPost]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<ServiceDto> Create([FromBody] ServiceCreateDto block)
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
        public ActionResult<ServiceDto> Update([FromBody] ServiceUpdateDto block)
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
