using Microsoft.AspNetCore.Http;
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
        [HttpGet("author/{author}")]
        public IEnumerable<Quote> GetQuotesByAuthor(string author) => _quoteService.GetByAuthor(author);

        /// <summary>
        /// Replace an existing quote with a new one
        /// </summary>
        [HttpPut]
        public ActionResult Update(Quote newQuote)
        {
            Quote oldQuote = _quoteService.GetById(newQuote.Id);
            if (oldQuote is null)
                return NotFound(new { message = "The quote Id does not exist." });

            _quoteService.Update(oldQuote, newQuote);

            return NoContent();
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

            if (quote is null)
                return NotFound();

            _quoteService.Delete(quote);

            return NoContent();
        }
    }
}