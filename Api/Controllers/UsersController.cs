using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Entities;
using ProgrammingQuotesApi.Models.Users;
using ProgrammingQuotesApi.Services;
using ProgrammingQuotesApi.Authorization;

namespace ProgrammingQuotesApi.Controllers
{
    [CustomAuthorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
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
        public IActionResult Authenticate(AuthenticateRequest req)
        {
            AuthenticateResponse response = _userService.Authenticate(req);
            return Ok(response);
        }

        [CustomAuthorize(Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            IEnumerable<User> users = _userService.GetAll();
            return Ok(users);
        }

        [CustomAuthorize(Role.Admin)]
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            User user = _userService.GetById(id);
            return Ok(user);
        }
    }
}
