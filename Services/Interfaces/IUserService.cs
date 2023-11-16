using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IUserService
    {
        UserAuthRes Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User GetByUsername(string username);
        void Register(UserRegister user);
        void Delete(User user);
        void Replace(User user, User newUser);
        void Update(User user);
        void Update(User user, UserUpdate req);
        void addFavoriteQuote(User user, Quote quote); // Corrected method name
        bool UsernameTaken(string username);
    }
}
