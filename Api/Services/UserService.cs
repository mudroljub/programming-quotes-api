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
            List<User> dummyUsers = new()
            {
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "admin",
                    PasswordHash = BCryptNet.HashPassword("admin"),
                    Role = "Admin"
                },
                new User
                {
                    Id = 2,
                    Username = "user",
                    Password = "user",
                    PasswordHash = BCryptNet.HashPassword("user"),
                    Role = "User"
                },
                new User
                {
                    Id = 3,
                    Username = "goku",
                    Password = "goku",
                    Role = "Manager"
                },
                new User
                {
                    Id = 4,
                    Username = "vejeta",
                    Password = "vejeta",
                    Role = "Employee"
                },
                new User
                {
                    Id = 5,
                    Username = "kuririn",
                    Password = "kuririn",
                    Role = "Tester"
                }
            };
            _context.Users.AddRange(dummyUsers);
            _context.SaveChanges();
        }

        public User Login(string username, string password)
        {
            return _context.Users.Where(x => x.Username.ToLower() == username.ToLower() && x.Password == password).FirstOrDefault();
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