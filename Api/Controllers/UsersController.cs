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
        /// Returns a user data for a given username
        /// </summary>
        [HttpGet("{username}")]
        public ActionResult<User> GetByUsername(string username)
        {
            User user = _userService.GetByUsername(username);
            return Ok(user);
        }

        /// <summary>
        /// Returns my user details 🔒
        /// </summary>
        [HttpGet]
        [Authorize]
        [Route("me")]
        public ActionResult<User> GetMyUser()
        {
            User user = _userService.GetByUsername(User.Identity.Name);
            return Ok(user);
        }

        /// <summary>
        /// Admin dashboard 🔒
        /// </summary>
        [HttpGet]
        [Route("dashboard")]
        [Authorize(Roles = "Admin,Editor")]
        public string Dashboard() => "Admin Dashboard. Only for Admins and Editors here";

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
        /// Replace my old user data with a new one 🔒
        /// </summary>
        [HttpPut]
        [Route("me")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Update([FromBody] User newUser)
        {
            User oldUser = _userService.GetByUsername(User.Identity.Name);
            if (oldUser.Id != newUser.Id)
                return BadRequest("You must send your user ID.");
            try
            {
                _userService.Update(newUser);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Delete a user by id 🔒
        /// </summary>
        [Authorize]
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
