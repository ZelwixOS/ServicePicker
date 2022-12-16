namespace Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Application.DTO.Request.Account;
    using Application.DTO.Response.Account;
    using Application.Helpers;
    using Application.Interfaces;
    using Domain.Models;
    using Domain.RepositoryInterfaces;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Answer = Helpers.Constants.AnswerMessage;

    public class AccountService : IAccountService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IUserRepository userRepository;

        public AccountService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IUserRepository userRepository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.userRepository = userRepository;
        }

        public async Task<MessageResultDto> Login(LogInDto model)
        {
            var user = this.userRepository.GetItems().FirstOrDefault(u => u.UserName == model.Login && !u.Banned);
            if (user == null)
            {
                return new MessageResultDto(Answer.LoginError, new List<string> { "Пользователь не найден" });
            }

            var result = await this.signInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, true);
            if (result.Succeeded)
            {
                return new MessageResultDto(Answer.LoggedAs + model.Login, null, Constants.AnswerCodes.SignedIn);
            }
            else
            {
                List<string> err = new List<string>();
                err.Add(Answer.WrongCreds);

                return new MessageResultDto(Answer.LoginError, err);
            }
        }

        public async Task<string> LogOut()
        {
            await this.signInManager.SignOutAsync();
            return Answer.LogOutSucceed;
        }

        public int BanUser(Guid id)
        {
            var user = this.userRepository.GetItem(id);
            if (user == null)
            {
                return 0;
            }

            user.Banned = true;

            var res = this.userRepository.UpdateUser(user);

            return res == null ? 0 : 1;
        }

        public int UnBanUser(Guid id)
        {
            var user = this.userRepository.GetItem(id);
            if (user == null)
            {
                return 0;
            }

            user.Banned = false;

            var res = this.userRepository.UpdateUser(user);

            return res == null ? 0 : 1;
        }

        public Task<User> GetCurrentUserAsync(HttpContext httpCont) => this.userManager.GetUserAsync(httpCont?.User);

        public async Task<IList<string>> GetRole(HttpContext httpCont)
        {
            var usr = await this.userManager.GetUserAsync(httpCont?.User);
            if (usr != null)
            {
                return await this.userManager.GetRolesAsync(usr);
            }
            else
            {
                var rolesList = new List<string>();
                rolesList.Add(Constants.RoleManager.Guest);
                return rolesList;
            }
        }

        public Task<IList<User>> GetByRole(string role)
        {
            return this.userManager.GetUsersInRoleAsync(role);
        }

        public async Task<UserInfo> GetCurrentUserInfo(HttpContext httpCont)
        {
            User usr = await GetCurrentUserAsync(httpCont);
            if (usr != null)
            {
                string role = (await this.userManager.GetRolesAsync(usr)).FirstOrDefault();
                if (role != null)
                {
                    var userInfo = new UserInfo(usr, role);
                    return userInfo;
                }
            }

            return null;
        }
    }
}
