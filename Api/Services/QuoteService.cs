using MongoDB.Bson;
using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;
using System;

namespace ProgrammingQuotesApi.Services
{
    public class QuoteService
    {
        private readonly DataContext _context;

        public QuoteService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Quote> GetAll(int count = 0)
        {
            return (count > 0 && count <= _context.Quotes.Count())
            ? _context.Quotes.Take(count)
            : _context.Quotes;
        }

        public Quote GetById(string id) => _context.Quotes.FirstOrDefault(p => p.Id == id);

        public Quote GetRandom() => _context.Quotes.ToList()[new Random().Next(0, _context.Quotes.Count())];

        public IEnumerable<Quote> GetByAuthor(string author) => _context.Quotes.Where(p => p.Author == author);

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

        public void Update(Quote newQuote)
        {
            Quote oldQuote = _context.Quotes.Where(q => q.Id == newQuote.Id).FirstOrDefault();
            if (oldQuote == null) return;
 
            _context.Entry(oldQuote).CurrentValues.SetValues(newQuote);
            _context.SaveChanges();
        }
    }
}