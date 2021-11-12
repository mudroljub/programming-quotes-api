using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using Microsoft.AspNetCore.JsonPatch;
using System.Net.Mime;
using Microsoft.AspNetCore.Http;

namespace ProgrammingQuotesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class AuthorsController : ControllerBase
    {
        public AuthorsController() {}

        /// <summary>
        /// Returns a list of authors
        /// </summary>
        [HttpGet]
        public ActionResult<Dictionary<string, Author>> GetAuthors()
        {
            var authors = AuthorsService.GetAuthors();
            return Ok(authors);
        }

        /// <summary>
        /// Returns total number of authors
        /// </summary>
        [HttpGet("count")]
        public ActionResult<int> GetCount() => Ok(AuthorsService.GetAuthors().Count);

        /// <summary>
        /// Returns author details
        /// </summary>
        [HttpGet("{author}")]
        public ActionResult<Author> GetAuthorDetails(string author) => AuthorsService.GetAuthorDetails(author);

    }
}