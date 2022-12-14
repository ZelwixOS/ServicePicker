namespace ServicePicker.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Application.DTO.Request.Account;
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
        private readonly IRolesIntializer rolesIntializer;
        private readonly ILogger logger;

        public AccountController(IAccountService accountService, ILogger<AccountController> logger, IRolesIntializer rolesIntializer)
        {
            this.accountService = accountService;
            this.rolesIntializer= rolesIntializer;
            this.logger = logger;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<MessageResultDto>> Register([FromBody] CustomerRegistrationDto model)
        {
            return this.Ok(await accountService.Register(model));
        }

        [HttpPost]
        [Route("RegisterViaGoogle")]
        public async Task<ActionResult<MessageResultDto>> RegisterViaGoogle([FromBody] CustomerRegistrationDto model)
        {
            return this.Ok(await accountService.RegisterViaGoogle(model));
        }

        [HttpPost("GoogleAuth")]
        public async Task<ActionResult<MessageResultDto>> AuthViaGoogle([FromBody] GoogleLoginDto loginData)
        {
            var answer = await accountService.GoogleAuth(loginData.Token);
            return Ok(answer);
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
        [Route("GetClients")]
        [Authorize(Roles = Constants.RoleManager.Admin)]
        public async Task<ActionResult<List<UserInfo>>> GetClients()
        {
            return Ok(await accountService.GetClientsAsync());
        }

        [HttpGet]
        [Route("Role")]
        public async Task<ActionResult<string>> Role()
        {
            var roles = await this.accountService.GetRole(HttpContext);
            return Ok(roles.FirstOrDefault());
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
