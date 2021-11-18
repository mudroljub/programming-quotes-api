using BCryptNet = BCrypt.Net.BCrypt;
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
            _context.Database.EnsureDeleted();
            List<User> dummyUsers = new()
            {
                new User
                {
                    Id = 1,
                    Username = "admin",
                    FirstName = "Admin",
                    LastName = "Adminowsky",
                    Password = BCryptNet.HashPassword("admin"),
                    Role = "Admin"
                },
                new User
                {
                    Id = 2,
                    Username = "user",
                    Password = BCryptNet.HashPassword("user"),
                    Role = "User"
                },
                new User
                {
                    Id = 3,
                    Username = "goku",
                    Password = BCryptNet.HashPassword("goku"),
                    Role = "Editor"
                },
            };
            _context.Users.AddRange(dummyUsers);
            _context.SaveChanges();
        }

        private static bool VerifyPassword(string password, string hash)
        {
            return BCryptNet.Verify(password, hash);
        }

        public User Authenticate(string username, string password)
        {
            return _context.Users.FirstOrDefault(x => x.Username.ToLower() == username.ToLower() && VerifyPassword(password, x.Password));
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

        public void Add(User user)
        {
            _context.Users.AddRange(user);
            _context.SaveChanges();
        }
    }
}