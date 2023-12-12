using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserAuthRes> AuthenticateAsync(string username, string password);
        IEnumerable<User> GetAll();
        Task<User> GetByIdAsync(int id);
        Task<User> GetByUsernameAsync(string username);
        void Register(UserRegister user);
        void Delete(User user);
        void Replace(User user, User newUser);
        void Update(User user);
        void Update(User user, UserUpdate req);
        void AddFavoriteQuote(User user, Quote quote);
        bool UsernameTaken(string username);
    }
}
