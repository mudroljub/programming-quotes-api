using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace ProgrammingQuotesApi.Controllers
{
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

        /// <remarks>
        /// Sample request:
        ///
        ///     {
        ///        "username": "admin",
        ///        "password": "admin"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        // public IActionResult Authenticate(AuthRequest req)
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] AuthRequest req)
        {
            User user = _userService.Login(req.Username, req.Password);

            if (user == null)
                return NotFound(new { message = "User or password invalid" }); // Unauthorized

            string token = TokenService.CreateToken(user);
            user.Password = ""; // TODO: hide password field
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
        [Authorize(Roles = "Tester")]
        public string Tester()
        {
            return "Hello Tester";
        }

        [HttpGet]
        [Route("employee")]
        [Authorize(Roles = "Employee,Manager")]
        public string Employee() => "Hello Employee";

        [HttpGet]
        [Route("manager")]
        [Authorize(Roles = "Manager")]
        public string Manager() => "Hello Manager";

    }
}
