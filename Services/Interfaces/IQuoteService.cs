using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IQuoteService
    {
        Task<int> CountAsync();
        IEnumerable<Quote> GetAll(int num = 0);
        Task<IEnumerable<Quote>> GetAllAsync(int num);
        Task<Quote> GetByIdAsync(string id);
        Task<Quote> GetRandomAsync();
        IEnumerable<Quote> GetByAuthor(string authorName);
        Task AddAsync(Quote quote);
        void Delete(Quote quote);
        void Replace(Quote quote, Quote newQuote);
        void Update(Quote quote);
    }
}
