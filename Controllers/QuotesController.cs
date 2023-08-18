using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;

namespace ProgrammingQuotesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    public class QuotesController : ControllerBase
    {
        private readonly QuoteService _quoteService;
        private readonly UserService _userService;

        public QuotesController(QuoteService quoteService, UserService userService) {
            _quoteService = quoteService;
            _userService = userService;
        }

        /// <summary>
        /// Returns a list of quotes
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<Quote>> GetAll([FromQuery] int num = 20)
        {
            IEnumerable<Quote> quotes = _quoteService.GetAll(num);
            return Ok(quotes);
        }

        /// <summary>
        /// Returns a quote for a given id
        /// </summary>
        /// <remarks>
        /// For example: 5a6ce86e2af929789500e7e4
        /// </remarks>
        [HttpGet("{id}", Name = "Get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Quote> Get(string id)
        {
            Quote quote = _quoteService.GetById(id);

            return quote == null ? NotFound() : Ok(quote);
        }

        /// <summary>
        /// Returns a random quote
        /// </summary>
        [HttpGet("random")]
        public ActionResult<Quote> GetRandom() => Ok(_quoteService.GetRandom());

        /// <summary>
        /// Returns total number of quotes
        /// </summary>
        [HttpGet("count")]
        public ActionResult<int> GetCount() => Ok(_quoteService.GetAll().Count());

        /// <remarks>
        /// Don't send quote id, it will be auto-generated.
        /// </remarks>
        /// <summary>
        /// Create new quote
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Create([FromBody] Quote quote)
        {
            _quoteService.Add(quote);
            return CreatedAtRoute("Get", new { id = quote.Id }, quote);
        }

        /// <summary>
        /// Returns all quotes for a given author
        /// </summary>
        /// <param name="author">The name of the author from Wikipedia. For example: Edsger W. Dijkstra</param>
        [HttpGet("author/{authorName}")]
        public ActionResult<IEnumerable<Quote>> GetQuotesByAuthor(string authorName) => Ok(_quoteService.GetByAuthor(authorName));

        /// <summary>
        /// Replace an existing quote with a new one
        /// </summary>
        [HttpPut]
        public ActionResult Update(Quote newQuote)
        {
            Quote oldQuote = _quoteService.GetById(newQuote.Id);
            if (oldQuote == null)
                return NotFound(new { message = "The quote Id does not exist." });

            _quoteService.Replace(oldQuote, newQuote);

            return Ok(newQuote);
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     [
        ///       {
        ///          "path": "/author",
        ///          "op": "replace",
        ///          "value": "Anonymous"
        ///       }
        ///     ]
        ///
        /// You could use Id: 5a6ce86e2af929789500e7e4
        /// </remarks>
        /// <summary>
        /// Update certain properties of an existing quote
        /// </summary>
        [HttpPatch("{id}")]
        public ActionResult Patch(string id, JsonPatchDocument<Quote> patch)
        {
            Quote quote = _quoteService.GetById(id);
            if (quote == null)
                return NotFound();

            patch.ApplyTo(quote);
            _quoteService.Update(quote);

            return Ok(quote);
        }

        /// <summary>
        /// Delete a quote by id
        /// </summary>
        /// <remarks>
        /// For example: 5a6ce86e2af929789500e7e4
        /// </remarks>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            Quote quote = _quoteService.GetById(id);
            if (quote == null) return NotFound();

            _quoteService.Delete(quote);

            return NoContent();
        }

        /// <summary>
        /// Add favorite quote 🔒
        /// </summary>
        /// <remarks>
        /// For example: "5a6ce86e2af929789500e7e4"
        /// </remarks>
        [HttpPost]
        [Authorize]
        [Route("addFavorite")]
        public ActionResult<User> addFavorite([FromBody] string quoteId)
        {
            Quote quote = _quoteService.GetById(quoteId);
            if (quote == null) return NotFound();

            User user = _userService.GetByUsername(User.Identity.Name);
            if (user == null) return NotFound();

            _userService.addFavoriteQuote(user, quote);
            return Ok(user);
        }
    }
}