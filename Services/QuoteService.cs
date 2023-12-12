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

        public async Task<Quote> GetByIdAsync(string id)
        {
            return await _context.Quotes.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<int> CountAsync() => await _context.Quotes.CountAsync();

        public async Task<IEnumerable<Quote>> GetAllAsync(int num = 0)
        {
            int length = await _context.Quotes.CountAsync();
            return (num > 0 && num <= length)
              ? _context.Quotes.Take(num)
              : _context.Quotes;
        }

        public IEnumerable<Quote> GetAll(int num = 0)
        {
          int length = _context.Quotes.Count();
          return (num > 0 && num <= length)
            ? _context.Quotes.Take(num)
            : _context.Quotes;
        }

        public async Task<Quote> GetRandomAsync()
        {
            List<Quote> quotes = await _context.Quotes.ToListAsync();
            int index = new Random().Next(0, await _context.Quotes.CountAsync());
            return quotes[index];
        }

        public IEnumerable<Quote> GetByAuthor(string authorName) => _context.Quotes.Where(p => p.Author == authorName);
        public async Task <IEnumerable<Quote>> GetByAuthorAsync(string authorName) => await _context.Quotes.Where(p => p.Author == authorName).ToListAsync();

        public async Task AddAsync(Quote quote)
        {
            quote.Id = ObjectId.GenerateNewId().ToString();
            await _context.Quotes.AddAsync(quote);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Quote quote)
        {
            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();
        }

        public async Task ReplaceAsync(Quote oldQuote, Quote newQuote)
        {
            _context.Entry(oldQuote).CurrentValues.SetValues(newQuote);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Quote quote)
        {
            _context.Quotes.Update(quote);
            await _context.SaveChangesAsync();
        }
    }
}