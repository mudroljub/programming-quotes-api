using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services.Interfaces
{
    public interface IAuthorService
    {
        List<Author> GetAuthors();
        Author GetAuthorDetails(string authorName);
    }
}
