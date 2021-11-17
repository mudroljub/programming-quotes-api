using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Net.Mime;

namespace ProgrammingQuotesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class AuthorsController : ControllerBase
    {
        public AuthorsController() { }

        /// <summary>
        /// Returns a list of authors
        /// </summary>
        [HttpGet]
        public ActionResult<Dictionary<string, Author>> GetAuthors()
        {
            Dictionary<string, Author> authors = AuthorService.GetAuthors();
            return Ok(authors);
        }

        /// <summary>
        /// Returns total number of authors
        /// </summary>
        [HttpGet("count")]
        public ActionResult<int> GetCount() => Ok(AuthorService.GetAuthors().Count);

        /// <summary>
        /// Returns author details
        /// </summary>
        /// <param name="author">The name of the author from Wikipedia.</param>
        [HttpGet("{author}")]
        public ActionResult<Author> GetAuthorDetails(string author) => AuthorService.GetAuthorDetails(author);

    }
}