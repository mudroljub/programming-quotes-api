using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services
{
    public interface IQuoteService
    {
        IEnumerable<Quote> GetAll(int count);
        Quote GetById(string id);
        Quote GetRandom();
        IEnumerable<Quote> GetByAuthor(string author);
        void Add(Quote quote);
        void Delete(Quote quote);
        void Replace(Quote quote, Quote newQuote);
        void Update(Quote quote);
    }
}
