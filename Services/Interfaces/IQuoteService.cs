using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IQuoteService
    {
        Task<IEnumerable<Quote>> GetAll(int num = 0);
        Task<int> Count();
        Task<Quote> GetById(string id);
        Task<Quote> GetRandom();
        Task<List<Quote>> GetByAuthor(string authorName);
        Task Add(Quote quote);
        Task Delete(Quote quote);
        Task Replace(Quote oldQuote, Quote newQuote);
        Task Update(Quote quote);
    }
}
