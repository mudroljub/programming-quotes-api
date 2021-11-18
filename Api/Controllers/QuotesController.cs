using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using Microsoft.AspNetCore.JsonPatch;
using System.Net.Mime;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace ProgrammingQuotesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    public class QuotesController : ControllerBase
    {
        private readonly QuoteService _quoteService;
        public QuotesController(QuoteService quoteService) {
            _quoteService = quoteService;
        }

        /// <summary>
        /// Returns a list of quotes
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<Quote>> GetAll([FromQuery] int count = 0)
        {
            IEnumerable<Quote> quotes = _quoteService.GetAll(count);
            return Ok(quotes);
        }

        /// <summary>
        /// Returns a quote for a given id
        /// </summary>
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
        /// <param name="author">The name of the author from Wikipedia.</param>
        [HttpGet("author/{author}")]
        public ActionResult<List<Quote>> GetQuotesByAuthor(string author) => _quoteService.GetByAuthor(author);

        /// <summary>
        /// Replace an existing quote with a new one
        /// </summary>
        [HttpPut("{id}")]
        public ActionResult Update(string id, Quote quote)
        {
            if (id != quote.Id)
                return BadRequest();

            Quote existingQuote = _quoteService.GetById(id);
            if (existingQuote is null)
                return NotFound();

            _quoteService.Update(quote);

            return NoContent();
        }

        /// <summary>
        /// Update certain properties of an existing quote
        /// </summary>
        [HttpPatch("{id}")]
        public ActionResult Patch(string id, JsonPatchDocument<Quote> patch)
        {
            Quote quote = _quoteService.GetById(id);
            if (quote is null)
                return NotFound();

            patch.ApplyTo(quote);
            _quoteService.Update(quote);

            return NoContent();
        }

        /// <summary>
        /// Delete an existing quote by id
        /// </summary>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            Quote quote = _quoteService.GetById(id);

            if (quote is null)
                return NotFound();

            _quoteService.Delete(id);

            return NoContent();
        }
    }
}