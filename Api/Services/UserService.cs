using BCryptNet = BCrypt.Net.BCrypt;
using ProgrammingQuotesApi.Authorization;
using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProgrammingQuotesApi.Services
{
    public class UserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;

            List<User> dummyUsers = new()
            {
                new User { Id = 1, FirstName = "Dylan", LastName = "Dog", Username = "admin", PasswordHash = BCryptNet.HashPassword("admin"), Role = "Admin" },
                new User { Id = 2, FirstName = "Groucho", LastName = "Marx", Username = "user", PasswordHash = BCryptNet.HashPassword("user"), Role = "User" }
            };
            _context.Users.AddRange(dummyUsers);
            _context.SaveChanges();
        }

        // public UserDetail Authenticate(AuthRequest req)
        // {
        //     User user = _context.Users.SingleOrDefault(x => x.Username == req.Username);

        //     if (user == null || !BCryptNet.Verify(req.Password, user.PasswordHash))
        //         return null;

        //     string jwtToken = _jwtUtils.GenerateJwtToken(user);
        //     return new UserDetail(user, jwtToken);
        // }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            User user = _context.Users.Find(id);
            return user ?? throw new KeyNotFoundException("User not found");
        }

        public void Add(User user)
        {
            _context.Users.AddRange(user);
            _context.SaveChanges();
        }
    }
}