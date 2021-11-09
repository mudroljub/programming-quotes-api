using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services;

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
        public ActionResult<List<Quote>> GetAll() => QuotesService.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Quote> Get(string id)
        {
            Quote quote = QuotesService.Get(id);

            if(quote == null)
                return NotFound();

            return quote;
        }

        [HttpGet("random")]
        public ActionResult<Quote> GetRandom() => QuotesService.GetRandom();

        [HttpPost]
        public IActionResult Create(Quote quote)
        {            
            QuotesService.Add(quote);
            return CreatedAtAction(nameof(Create), new { id = quote.Id }, quote);
        }

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