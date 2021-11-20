using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProgrammingQuotesApi.Services
{
    public class AuthorService
    {
        private readonly QuoteService _quoteService;
        readonly Dictionary<string, Author> Authors = new();

        public AuthorService(QuoteService quoteService)
        {
            _quoteService = quoteService;
            foreach (Quote q in _quoteService.GetAll())
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

        public Dictionary<string, Author> GetAuthors() => Authors;

        public Author GetAuthorDetails(string author)
        {
            IEnumerable<Quote> authorQuotes = _quoteService.GetByAuthor(author);
            Author authorDetails = new Author()
            {
                Name = author,
                WikiUrl = $"https://en.wikipedia.org/wiki/{author}",
                QuoteCount = authorQuotes.Count(),
                Quotes = authorQuotes
            };
            return authorDetails;
        }

    }
}