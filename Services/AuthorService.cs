using ProgrammingQuotesApi.Models;
using ProgrammingQuotesApi.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly IQuoteService _quoteService;
        readonly Dictionary<string, Author> Authors = new();

        private async Task PopulateAuthors()
        {
            foreach (Quote q in await _quoteService.GetAll())
            {
                if (Authors.ContainsKey(q.Author))
                {
                    Authors[q.Author].QuoteCount++;
                }
                else
                {
                    Authors.Add(q.Author, new Author()
                    {
                        Name = q.Author,
                        WikiUrl = $"https://en.wikipedia.org/wiki/{q.Author}",
                        QuoteCount = 1
                    });
                }
            }
        }

        public AuthorService(IQuoteService quoteService)
        {
            _quoteService = quoteService;
        }

        public async Task<List<Author>> GetAuthors()
        {
            await PopulateAuthors();
            return Authors.Values.OrderByDescending(author => author.QuoteCount).ToList();
        }

        public async Task<int> GetCount() => (await GetAuthors()).Count;

        public async Task<Author> GetAuthorDetails(string authorName)
        {
            IEnumerable<Quote> authorQuotes = await _quoteService.GetByAuthor(authorName);
            if (!authorQuotes.Any()) {
              return null;
            }

            Author authorDetails = new Author()
            {
                Name = authorName,
                WikiUrl = $"https://en.wikipedia.org/wiki/{authorName}",
                QuoteCount = authorQuotes.Count(),
                Quotes = authorQuotes
            };
            return authorDetails;
        }

    }
}