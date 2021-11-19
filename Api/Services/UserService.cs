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

        public User Authenticate(string username, string password)
        {
            return _context.Users.FirstOrDefault(x => x.Username.ToLower() == username.ToLower() && VerifyPassword(password, x.Password));
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
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        
        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}