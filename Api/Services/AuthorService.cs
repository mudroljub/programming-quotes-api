using ProgrammingQuotesApi.Models;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Services
{
    public static class AuthorService
    {
        static readonly Dictionary<string, Author> Authors = new();
        static AuthorService()
        {
            foreach (var q in QuoteService.GetQuotes())
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
            var authorQuotes = QuoteService.GetByAuthor(author);
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