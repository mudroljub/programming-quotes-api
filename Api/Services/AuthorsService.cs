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
        static List<Quote> Quotes { get; }

        static AuthorsService()
        {
          var options = new JsonSerializerOptions
          {
              PropertyNameCaseInsensitive = true
          };
          string fileContent = File.ReadAllText("Data/quotes.json");
          Quotes = JsonSerializer.Deserialize<List<Quote>>(fileContent, options);
        }

        public static List<Author> GetAuthors()
        {   
            // TODO: call QuotesService.GetQuotes() to get all quotes
            var authors = Quotes.Select(a => new Author() { 
                Name = a.Author, 
                QuotesUrl = $"https://programmingquotesapi.azurewebsites.net/quotes/author/{a.Author}",
                WikiUrl = $"https://en.wikipedia.org/wiki/{a.Author}"
            }).ToList();
            return authors;
        }
    }
}