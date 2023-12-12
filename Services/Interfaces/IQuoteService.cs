using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IQuoteService
    {
        IEnumerable<Quote> GetAll(int num = 0);
        Task<IEnumerable<Quote>> GetAllAsync(int num);
        Task<int> CountAsync();
        Task<Quote> GetByIdAsync(string id);
        Task<Quote> GetRandomAsync();
        IEnumerable<Quote> GetByAuthor(string authorName);
        Task AddAsync(Quote quote);
        Task DeleteAsync(Quote quote);
        Task ReplaceAsync(Quote oldQuote, Quote newQuote);
        Task UpdateAsync(Quote quote);
    }
}
