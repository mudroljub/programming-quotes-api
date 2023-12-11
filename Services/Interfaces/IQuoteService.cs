using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IQuoteService
    {
        IEnumerable<Quote> GetAll(int num = 0);
        Quote GetById(string id);
        Quote GetRandom();
        IEnumerable<Quote> GetByAuthor(string authorName);
        void Add(Quote quote);
        void Delete(Quote quote);
        void Replace(Quote quote, Quote newQuote);
        void Update(Quote quote);
    }
}
