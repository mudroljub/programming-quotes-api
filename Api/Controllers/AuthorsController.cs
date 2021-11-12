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
        public ActionResult<List<Author>> GetAuthors()
        {
            var authors = AuthorsService.GetAuthors();
            return Ok(authors);
        }

        /// <summary>
        /// Returns a random author
        /// </summary>
        // [HttpGet("random")]
        // public ActionResult<Author> GetRandom() => Ok(AuthorsService.GetRandom());

        /// <summary>
        /// Returns total number of authors
        /// </summary>
        // [HttpGet("count")]
        // public ActionResult<int> GetCount() => Ok(AuthorsService.GetAuthors().Count);

        /// <summary>
        /// Returns all authors for a given author
        /// </summary>
        // [HttpGet("quotes/{author}")]
        // public ActionResult<List<Author>> GetAuthorsByAuthor(string author) => AuthorsService.GetByAuthor(author);

    }
}