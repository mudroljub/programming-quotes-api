using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IQuoteService
    {
        Task<IEnumerable<Quote>> GetAllAsync(int num = 0);
        Task<int> CountAsync();
        Task<Quote> GetByIdAsync(string id);
        Task<Quote> GetRandomAsync();
        Task<List<Quote>> GetByAuthorAsync(string authorName);
        Task AddAsync(Quote quote);
        Task DeleteAsync(Quote quote);
        Task ReplaceAsync(Quote oldQuote, Quote newQuote);
        Task UpdateAsync(Quote quote);
    }
}
