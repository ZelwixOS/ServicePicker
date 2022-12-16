namespace WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Application.DTO.Request.Account;
    using Application.DTO.Response;
    using Application.DTO.Response.Account;
    using Application.Helpers;
    using Application.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;
        private readonly ILogger logger;

        public AccountController(IAccountService accountService, ILogger<AccountController> logger)
        {
            this.accountService = accountService;
            this.logger = logger;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<MessageResultDto>> Login([FromBody] LogInDto model)
        {
            return await this.accountService.Login(model);
        }

        [HttpPost]
        [Route("LogOut")]
        public async Task<ActionResult<string>> LogOut()
        {
            return Ok(await this.accountService.LogOut());
        }

        [HttpGet]
        [Route("GetCurrentUserInfo")]
        public async Task<ActionResult<UserInfo>> GetCurrentUserInfo()
        {
            return Ok(await this.accountService.GetCurrentUserInfo(HttpContext));
        }

        [HttpGet]
        [Route("Role")]
        public async Task<ActionResult<string>> Role()
        {
            var roles = await this.accountService.GetRole(HttpContext);
            return Ok(roles[0]);
        }

        [HttpPost]
        [Route("Ban/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Ban(Guid id)
        {
            var res = this.accountService.BanUser(id);
            return Ok(res);
        }

        [HttpPost]
        [Route("Unban/{id}")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public ActionResult<int> Unban(Guid id)
        {
            var res = this.accountService.UnBanUser(id);
            return Ok(res);
        }
    }
}
