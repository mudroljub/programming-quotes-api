using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services
{
    public static class AuthorsService
    {
        static readonly Dictionary<string, Author> Authors = new();
        static AuthorsService()
        {
            foreach (var q in QuotesService.GetQuotes())
            {
                if (Authors.ContainsKey(q.Author)) {  
                    Authors[q.Author].QuoteCount++;  
                }
                else {  
                    Authors.Add(q.Author, new Author()
                    {
                        Name = q.Author,
                        WikiUrl = $"https://en.wikipedia.org/wiki/{q.Author}",
                        QuoteCount = 1
                    });  
                }
            }
        }

        public static Dictionary<string, Author> GetAuthors() => Authors;

        public static Author GetAuthorDetails(string author)
        {
            var authorQuotes = QuotesService.GetByAuthor(author);
            var authorDetails = new Author()
            {
                Name = author,
                WikiUrl = $"https://en.wikipedia.org/wiki/{author}",
                QuoteCount = authorQuotes.Count,
                Quotes = authorQuotes
            };
            return authorDetails;
        }

    }
}