using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserAuthRes> Authenticate(string username, string password);
        Task<List<User>> GetAll();
        Task<User> GetById(int id);
        Task<User> GetByUsername(string username);
        Task Register(UserRegister user);
        Task Delete(User user);
        Task Update(User user);
        Task Update(User myUser, UserUpdate req);
        Task AddFavoriteQuote(User user, Quote quote);
        Task<bool> UsernameTaken(string username);
    }
}
