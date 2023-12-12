using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using ProgrammingQuotesApi.DbContexts;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProgrammingQuotesApi.Services.Interfaces;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services
{
    public class UserService : IUserService
    {
        private readonly ProgrammingContext _context;
        private readonly IMapper _mapper;

        public UserService(ProgrammingContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserAuthRes> AuthenticateAsync(string username, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(
                x => x.Username.ToLower() == username.ToLower() && VerifyPassword(password, x.Password)
            );
            if (user == null) return null;

            UserAuthRes response = _mapper.Map<UserAuthRes>(user);
            response.Token = TokenService.CreateToken(user);
            return response;
        }

        public IEnumerable<User> GetAll() => _context.Users.Include(u => u.FavoriteQuotes);

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.Include(u => u.FavoriteQuotes).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            User user = await _context.Users
                .Include(u => u.FavoriteQuotes)
                .FirstOrDefaultAsync(x => x.Username.ToLower() == username.ToLower());
            if (user == null) return null;

            return user;
        }

        public void Register(UserRegister user)
        {
            user.Password = BCryptNet.HashPassword(user.Password);
            User newUser = _mapper.Map<User>(user);
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

        public void AddFavoriteQuote(User user, Quote quote)
        {
            user.FavoriteQuotes.Add(quote);
            _context.SaveChanges();
        }

        /* UTILS */

        private static bool VerifyPassword(string password, string hash) => BCryptNet.Verify(password, hash);

        public bool UsernameTaken(string username) => string.IsNullOrEmpty(username) 
            ? false 
            : _context.Users.Any(x => x.Username.ToLower() == username.ToLower());
    }
}