using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Collections.Generic;

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
        /// Create a new user
        /// </summary>
        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult Create([FromBody] UserRegister req)
        {
            if (_userService.UsernameTaken(req.Username))
                return BadRequest(new { message = "Username " + req.Username + " is already taken" });

            _userService.Register(req);
            return Ok(new { message = "Registration successful" });
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
        public ActionResult Authenticate([FromBody] UserAuthReq req)
        {
            UserAuthRes user = _userService.Authenticate(req.Username, req.Password);

            if (user == null)
                return Unauthorized(new { message = "User or password invalid" });

            return Ok(user);
        }

        /// <summary>
        /// Returns all users
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAll()
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

            return user == null ? NotFound() : Ok(user);
        }

        /// <summary>
        /// Admin dashboard 🔒
        /// </summary>
        [HttpGet]
        [Route("dashboard")]
        [Authorize(Roles = "Admin,Editor")]
        public string Dashboard() => "Welcome to the Dashboard for admins and editors only.";

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
        /// Replace my old user data with a new one 🔒
        /// </summary>
        [HttpPut]
        [Authorize]
        [Route("me")]
        public ActionResult Update([FromBody] UserUpdate req)
        {
            var myUser = _userService.GetByUsername(User.Identity.Name);
            if (req.Username != myUser.Username && _userService.UsernameTaken(req.Username))
                return BadRequest(new { message = "Username " + req.Username + " is already taken" });

            _userService.Update(myUser, req);
            return Ok(new { message = "User updated successfully" });
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     [
        ///       {
        ///          "path": "/firstName",
        ///          "op": "replace",
        ///          "value": "Master"
        ///       }
        ///     ]
        ///
        /// </remarks>
        /// <summary>
        /// Update certain properties of my user 🔒
        /// </summary>
        [HttpPatch]
        [Authorize]
        [Route("me")]
        public ActionResult Patch(JsonPatchDocument<User> patch)
        {
            User user = _userService.GetByUsername(User.Identity.Name);
            if (user == null) return NotFound();

            patch.ApplyTo(user);
            _userService.Update(user);

            return Ok(user);
        }

        /// <summary>
        /// Delete a user by id 🔒
        /// </summary>
        [Authorize]
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int id)
        {
            User user = _userService.GetById(id);

            if (user == null)
                return NotFound();

            _userService.Delete(user);

            return NoContent();
        }

    }
}
