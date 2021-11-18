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
            // _context.Database.EnsureDeleted();
            List<User> dummyData = new()
            {
                new User
                {
                    Username = "admin",
                    FirstName = "Admin",
                    LastName = "Adminowsky",
                    Password = BCryptNet.HashPassword("admin"),
                    Role = "Admin"
                },
                new User
                {
                    Username = "daman",
                    Password = BCryptNet.HashPassword("daman"),
                    Role = "User"
                },
                new User
                {
                    Username = "goku",
                    Password = BCryptNet.HashPassword("goku"),
                    Role = "Editor"
                },
            };
            if (!_context.Users.Any())
            {
                _context.Users.AddRange(dummyData);
                _context.SaveChanges();
            }
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