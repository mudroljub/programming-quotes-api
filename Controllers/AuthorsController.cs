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
        private readonly AuthorService _authorService;
        public AuthorsController(AuthorService authorService) {
            _authorService = authorService;
         }

        /// <summary>
        /// Returns a list of authors
        /// </summary>
        [HttpGet]
        public ActionResult<List<Author>> GetAuthors()
        {
            List<Author> authors = _authorService.GetAuthors();
            return Ok(authors);
        }

        /// <summary>
        /// Returns total number of authors
        /// </summary>
        [HttpGet("count")]
        public ActionResult<int> GetCount() => Ok(_authorService.GetAuthors().Count);

        /// <summary>
        /// Returns author details
        /// </summary>
        /// <param name="author">The name of the author from Wikipedia. For example: Edsger W. Dijkstra</param>
        [HttpGet("{author}")]
        public ActionResult<Author> GetAuthorDetails(string author) => Ok(_authorService.GetAuthorDetails(author));
    }
}