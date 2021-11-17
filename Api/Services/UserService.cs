using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using ProgrammingQuotesApi.Authorization;
using ProgrammingQuotesApi.Entities;
using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models.Users;

namespace ProgrammingQuotesApi.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest req);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }

    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IJwtUtils _jwtUtils;

        public UserService(
            DataContext context,
            IJwtUtils jwtUtils)
        {
            _context = context;
            _jwtUtils = jwtUtils;

            List<User> dummyUsers = new()
            {
                new User { Id = 1, FirstName = "Dylan", LastName = "Dog", Username = "admin", PasswordHash = BCryptNet.HashPassword("admin"), Role = Role.Admin },
                new User { Id = 2, FirstName = "Groucho", LastName = "Marx", Username = "user", PasswordHash = BCryptNet.HashPassword("user"), Role = Role.User }
            };
            _context.Users.AddRange(dummyUsers);
            _context.SaveChanges();
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest req)
        {
            User user = _context.Users.SingleOrDefault(x => x.Username == req.Username);

            if (user == null || !BCryptNet.Verify(req.Password, user.PasswordHash))
                throw new AppException("Username or password is incorrect");

            string jwtToken = _jwtUtils.GenerateJwtToken(user);
            return new AuthenticateResponse(user, jwtToken);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            User user = _context.Users.Find(id);
            return user ?? throw new KeyNotFoundException("User not found");
        }
    }
}