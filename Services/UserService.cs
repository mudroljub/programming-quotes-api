using AutoMapper;
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
        private readonly IMapper _mapper;

        public UserService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private static bool VerifyPassword(string password, string hash)
        {
            return BCryptNet.Verify(password, hash);
        }

        public UserAuthRes Authenticate(string username, string password)
        {
            User user = _context.Users.FirstOrDefault(x => x.Username.ToLower() == username.ToLower() && VerifyPassword(password, x.Password));
            if (user is null) return null;

            UserAuthRes response = _mapper.Map<UserAuthRes>(user);
            response.Token = TokenService.CreateToken(user);
            return response;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id) => _context.Users.FirstOrDefault(p => p.Id == id);

        public User GetByUsername(string username)
        {
            User user = _context.Users.FirstOrDefault(x => x.Username.ToLower() == username.ToLower());
            if (user is null) return null;

            return user;
        }

        public void Add(User user)
        {
            user.Password = BCryptNet.HashPassword(user.Password);
            user.Role = "User";
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Register(UserRegister req)
        {
            req.Password = BCryptNet.HashPassword(req.Password);
            User newUser = _mapper.Map<User>(req);
            newUser.Role = "User";
            _context.Users.Add(newUser);
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

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Update(User myUser, UserUpdate req)
        {
            if (!string.IsNullOrEmpty(req.Password))
                req.Password = BCryptNet.HashPassword(req.Password);

            _mapper.Map(req, myUser);
            _context.Users.Update(myUser);
            _context.SaveChanges();
        }

        public bool UsernameTaken(string username)
        {
            if (string.IsNullOrEmpty(username)) return false;

            return _context.Users.Any(x => x.Username.ToLower() == username.ToLower());
        }
    }
}