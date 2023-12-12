using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using System.Net.Mime;
using ProgrammingQuotesApi.Services.Interfaces;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;
        public AuthorsController(IAuthorService authorService) {
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
        /// <param name="authorName">The name of the author from Wikipedia. For example: Edsger W. Dijkstra</param>
        [HttpGet("{authorName}")]
        public async Task<ActionResult<Author>> GetAuthorDetails(string authorName) {
            Author authorInfo = await _authorService.GetAuthorDetailsAsync(authorName);
 
            return authorInfo == null ? NotFound() : Ok(authorInfo);
        }
    }
}