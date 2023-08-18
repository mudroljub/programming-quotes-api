using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services
{
    public interface IAuthorService
    {
        List<Author> GetAuthors();
        Author GetAuthorDetails(string author);
    }
}
