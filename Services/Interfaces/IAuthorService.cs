using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IAuthorService
    {
        Task<List<Author>> GetAuthors();
        Task<Author> GetAuthorDetails(string authorName);
        Task<int> GetCount();
    }
}
