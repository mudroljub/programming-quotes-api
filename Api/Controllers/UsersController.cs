using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Http;

namespace ProgrammingQuotesApi.Controllers
{
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
        /// Returns a user for a given username
        /// </summary>
        [HttpGet("{username}")]
        public IActionResult GetByUsername(string username)
        {
            User user = _userService.GetByUsername(username);
            return Ok(user);
        }

        /// <summary>
        /// Returns logged-in user details 🔒
        /// </summary>
        [HttpGet]
        [Route("me")]
        public string Authenticated() => String.Format("Your username is: {0}", User.Identity.Name);

        /// <summary>
        /// Admin dashboard 🔒
        /// </summary>
        [HttpGet]
        [Route("dashboard")]
        [Authorize(Roles = "Admin,Editor")]
        public string Admin() => "Admin Dashboard. Only for Admins and Editors here";

        /// <summary>
        /// Create a new user
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [AllowAnonymous]
        public ActionResult Create([FromBody] User req)
        {
            try
            {
                _userService.Add(req);
                return Created("", req);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Delete a user by id
        /// </summary>
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            User user = _userService.GetById(id);

            if (user is null)
                return NotFound();

            _userService.Delete(user);

            return NoContent();
        }

    }
}
