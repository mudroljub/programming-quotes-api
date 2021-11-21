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
        }

        private static bool VerifyPassword(string password, string hash)
        {
            return BCryptNet.Verify(password, hash);
        }

        public UserResponse Authenticate(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username.ToLower() == username.ToLower() && VerifyPassword(password, x.Password));
            if (user == null)         
                return null;

            string token = TokenService.CreateToken(user);
            return new UserResponse { 
                Id = user.Id,
                Username = user.Username, 
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Token = token 
            };
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id) => _context.Users.FirstOrDefault(p => p.Id == id);

        public User GetByUsername(string username)
        {
            User user = _context.Users.FirstOrDefault(x => x.Username.ToLower() == username.ToLower());
            return user ?? throw new KeyNotFoundException("User not found");
        }

        public void Add(User user)
        {
            user.Password = BCryptNet.HashPassword(user.Password);
            user.Role = "User";
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public void Replace(User oldUser, User newUser)
        {
            newUser.Password = BCryptNet.HashPassword(newUser.Password);
            _context.Entry(oldUser).CurrentValues.SetValues(newUser);
            _context.SaveChanges();
        }
    }
}