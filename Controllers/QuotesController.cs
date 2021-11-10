using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;
using System.Linq;

namespace ProgrammingQuotesApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuotesController : ControllerBase
    {
        public QuotesController()
        {
        }

        [HttpGet]
        public ActionResult<List<Quote>> GetQuotes([FromQuery] int count = 0)
        {
            return QuotesService.GetQuotes(count);
        }

        [HttpGet("{id}")]
        public ActionResult<Quote> Get(string id)
        {
            Quote quote = QuotesService.Get(id);

            if(quote == null)
                return NotFound();

            return Ok(quote);
        }

        [HttpGet("random")]
        public ActionResult<Quote> GetRandom() => Ok(QuotesService.GetRandom());

        [HttpPost]
        public ActionResult Create([FromBody] Quote quote)
        {            
            QuotesService.Add(quote);
            // return CreatedAtAction(nameof(Create), new { id = quote.Id }, quote);
            return Created("", quote);
        }

        [HttpGet("author/{author}")]
        public ActionResult<List<Quote>> GetQuotesByAuthor(string author) => QuotesService.GetByAuthor(author);

        [HttpPut("{id}")]
        public IActionResult Update(string id, Quote quote)
        {
            if (id != quote.Id)
                return BadRequest();

            Quote existingQuote = QuotesService.Get(id);
            if (existingQuote is null)
                return NotFound();

            QuotesService.Update(quote);           

            return NoContent();
        }

        // [HttpPatch("{id}")]
        // public async Task<ActionResult> Patch(string id, JsonPatchDocument<Quote> quoteUpdates)
        // {
        //     Quote quote = await QuotesService.Get(id);
        // }

    
        // public IActionResult Update(string id, [FromBody]JsonPatchDocument<Quote> patch)
        // {
        //     Quote quote = QuotesService.Get(id);
        //     if (quote is null)
        //         return NotFound();

        //     patch.ApplyTo(quote);
        //     QuotesService.Update(quote);

        //     return NoContent();
        // }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Quote quote = QuotesService.Get(id);

            if (quote is null)
                return NotFound();

            QuotesService.Delete(id);

            return NoContent();
        }
    }
}