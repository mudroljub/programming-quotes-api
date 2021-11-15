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
    [Consumes(MediaTypeNames.Application.Json)]
    public class QuotesController : ControllerBase
    {
        public QuotesController() {}

        /// <summary>
        /// Returns a list of quotes
        /// </summary>
        [HttpGet]
        public ActionResult<List<Quote>> GetQuotes([FromQuery] int count = 0)
        {
            var quotes = QuotesService.GetQuotes(count);
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
            Quote quote = QuotesService.Get(id);

            if (quote == null)
                return NotFound();

            return Ok(quote);
        }

        /// <summary>
        /// Returns a random quote
        /// </summary>
        [HttpGet("random")]
        public ActionResult<Quote> GetRandom() => Ok(QuotesService.GetRandom());

        /// <summary>
        /// Returns total number of quotes
        /// </summary>
        [HttpGet("count")]
        public ActionResult<int> GetCount() => Ok(QuotesService.GetQuotes().Count);

        /// <summary>
        /// Create new quote
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Create([FromBody] Quote quote)
        {            
            QuotesService.Add(quote);
            return CreatedAtRoute("Get", new { id = quote.Id }, quote);
        }

        /// <summary>
        /// Returns all quotes for a given author
        /// </summary>
        [HttpGet("author/{author}")]
        public ActionResult<List<Quote>> GetQuotesByAuthor(string author) => QuotesService.GetByAuthor(author);

        /// <summary>
        /// Replace an existing quote with a new one
        /// </summary>
        [HttpPut("{id}")]
        public ActionResult Update(string id, Quote quote)
        {
            if (id != quote.Id)
                return BadRequest();

            Quote existingQuote = QuotesService.Get(id);
            if (existingQuote is null)
                return NotFound();

            QuotesService.Update(quote);           

            return NoContent();
        }

        /// <summary>
        /// Update certain properties of an existing quote
        /// </summary>
        [HttpPatch("{id}")]
        public ActionResult Patch(string id, JsonPatchDocument<Quote> patch)
        {
            Quote quote = QuotesService.Get(id);
            if (quote is null)
                return NotFound();

            patch.ApplyTo(quote);
            QuotesService.Update(quote);

            return NoContent();
        }
    
        /// <summary>
        /// Delete an existing quote by id
        /// </summary>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            Quote quote = QuotesService.Get(id);

            if (quote is null)
                return NotFound();

            QuotesService.Delete(id);

            return NoContent();
        }
    }
}