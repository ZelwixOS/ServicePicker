using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Helpers
{
    public static class Constants
    {
        public enum AnswerCodes : int
        {
            NoCommand = 0,
            SignedIn = 3,
        }

        public enum GoogleAuthResultCodes : int
        {
            UserFound = 1,
            NoUserInDB = 2,
            EmailNotConnectedWithAccount = 3,
        }

        public static class RoleManager
        {
            public const string Guest = "Guest";

            public const string Admin = "Admin";
        }

        public static class AnswerMessage
        {
            public const string LoggedAs = "Вы вошли как: ";

            public const string WrongCreds = "Неверный логин или пароль";

            public const string LoginError = "Не удалось войти в систему";

            public const string LogOutSucceed = "Выполнен выход";

            public const string Redirection = "Перенаправление...";
        }
    }
}
