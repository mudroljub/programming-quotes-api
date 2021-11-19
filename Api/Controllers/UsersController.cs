using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Collections.Generic;
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

        /// <summary>
        /// Authenticates an existing user
        /// </summary>
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
        public ActionResult Authenticate([FromBody] UserAuth req)
        {
            User user = _userService.Authenticate(req.Username, req.Password);

            if (user == null)
                return Unauthorized(new { message = "User or password invalid" });

            string token = TokenService.CreateToken(user);
            return Ok(new
            {
                user,
                token
            });
        }

        /// <summary>
        /// Returns all users
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            IEnumerable<User> users = _userService.GetAll();
            return Ok(users);
        }

        /// <summary>
        /// Returns a user for a given id
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            User user = _userService.GetById(id);
            return Ok(user);
        }

        /// <summary>
        /// Returns current user details
        /// </summary>
        [HttpGet]
        [Route("me")]
        public string Authenticated() => String.Format("Your username is: {0}", User.Identity.Name);

        /// <summary>
        /// Admin dashboard
        /// </summary>
        [HttpGet]
        [Route("dashboard")]
        [Authorize(Roles = "Admin,Editor")]
        public string Admin() => "Admin Dashboard. Only for Admins and Editors here";

    }
}
