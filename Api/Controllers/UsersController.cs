using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using ProgrammingQuotesApi.Authorization;

namespace ProgrammingQuotesApi.Controllers
{
    [CustomAuthorize]
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
        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate(AuthRequest req)
        {
            UserDetail userDetail = _userService.Authenticate(req);
            return userDetail == null ? Unauthorized() : Ok(userDetail); // 403
        }

        [CustomAuthorize("Admin")]
        [HttpGet]
        public IActionResult GetAll()
        {
            IEnumerable<User> users = _userService.GetAll();
            return Ok(users);
        }

        [CustomAuthorize("Admin")]
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            User user = _userService.GetById(id);
            return Ok(user);
        }
    }
}
