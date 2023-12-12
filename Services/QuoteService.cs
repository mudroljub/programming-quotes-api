using MongoDB.Bson;
using ProgrammingQuotesApi.DbContexts;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using ProgrammingQuotesApi.Services.Interfaces;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProgrammingQuotesApi.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly ProgrammingContext _context;

        public QuoteService(ProgrammingContext context)
        {
            _context = context;
        }

        public IEnumerable<Quote> GetAll(int num = 0)
        {
            return (num > 0 && num <= _context.Quotes.Count())
            ? _context.Quotes.Take(num)
            : _context.Quotes;
        }

        public Quote GetRandom() => _context.Quotes.ToList()[new Random().Next(0, _context.Quotes.Count())];

        public IEnumerable<Quote> GetByAuthor(string authorName) => _context.Quotes.Where(p => p.Author == authorName);

        public void Add(Quote quote)
        {
            quote.Id = ObjectId.GenerateNewId().ToString();
            _context.Quotes.Add(quote);
            _context.SaveChanges();
        }

        public void Delete(Quote quote)
        {
            _context.Quotes.Remove(quote);
            _context.SaveChanges();
        }

        public void Replace(Quote oldQuote, Quote newQuote)
        { 
            _context.Entry(oldQuote).CurrentValues.SetValues(newQuote);
            _context.SaveChanges();
        }

        public void Update(Quote quote)
        {
            _context.Quotes.Update(quote);
            _context.SaveChanges();
        }

        public async Task<Quote> GetByIdAsync(string id)
        {
            return await _context.Quotes.FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}