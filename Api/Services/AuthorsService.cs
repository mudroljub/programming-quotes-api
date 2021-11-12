using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using System.Text.Json;
using System.IO;
using System;
using System.Net;

namespace ProgrammingQuotesApi.Services
{
    public static class AuthorsService
    {
        static AuthorsService()
        { }

        public static Dictionary<string, Author> GetAuthors()
        {   
            var quotes = QuotesService.GetQuotes();
            // var authors = quotes.Select(q => new Author() { 
            //     Name = q.Author, 
            //     QuotesUrl = $"https://programmingquotesapi.azurewebsites.net/quotes/author/{q.Author}",
            //     WikiUrl = $"https://en.wikipedia.org/wiki/{q.Author}"
            // }).ToList();
            IEnumerable<string> authorNames = quotes.Select(q => q.Author).Distinct(); // .ToList();
            Dictionary<string, Author> authors = new Dictionary<string, Author>();

            foreach (var authorName in authorNames)
            {
                authors.Add(authorName, new Author()
                {
                    Name = authorName,
                    QuotesUrl = $"https://programmingquotesapi.azurewebsites.net/quotes/author/{authorName}",
                    WikiUrl = $"https://en.wikipedia.org/wiki/{authorName}"
                });
            }

            return authors;
        }
    }
}