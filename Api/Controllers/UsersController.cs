using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace ProgrammingQuotesApi.Controllers
{
    // TODO: move to UserService
    public static class UserRepository
    {
        public static User Get(string username, string password)
        {
            List<User> users = new List<User>
            {
                new User { Id = 1, Username = "goku", Password = "goku", Role = "manager" },
                new User { Id = 2, Username = "vejeta", Password = "vejeta", Role = "employee" },
                new User { Id = 3, Username = "kuririn", Password = "kuririn", Role = "tester" }
            };
            return users.Where(x => x.Username.ToLower() == username.ToLower() && x.Password == password).FirstOrDefault();
        }
    }

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

/*
        /// <remarks>
        /// Sample request:
        ///
        ///     {
        ///        "username": "admin",
        ///        "password": "admin"
        ///     }
        ///
        /// </remarks>
        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate(AuthRequest req)
        {
            UserDetail userDetail = _userService.Authenticate(req);
            return userDetail == null ? Unauthorized() : Ok(userDetail); // 403
        }
*/

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] AuthRequest model)
        {
            User user = UserRepository.Get(model.Username, model.Password);

            if (user == null)
                return NotFound(new { message = "User or password invalid" });

            string token = TokenService.CreateToken(user);
            user.Password = "";
            return new
            {
                user,
                token
            };
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            IEnumerable<User> users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            User user = _userService.GetById(id);
            return Ok(user);
        }

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Your name is: {0}", User.Identity.Name);

        [HttpGet]
        [Route("tester")]
        [Authorize(Roles = "tester")]
        public string Tester()
        {
            return "Hello Tester";
        }

        [HttpGet]
        [Route("employee")]
        [Authorize(Roles = "employee,manager")]
        public string Employee() => "Hello Employee";

        [HttpGet]
        [Route("manager")]
        [Authorize(Roles = "manager")]
        public string Manager() => "Hello Manager";

    }
}
