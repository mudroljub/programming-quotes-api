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
            Dictionary<string, Author> authors = new Dictionary<string, Author>();

            foreach (var q in quotes)
            {
                if (authors.ContainsKey(q.Author)) {  
                    authors[q.Author].QuoteCount++;  
                }
                else {  
                    authors.Add(q.Author, new Author()
                    {
                        Name = q.Author,
                        QuotesUrl = $"https://programmingquotesapi.azurewebsites.net/quotes/author/{q.Author}",
                        WikiUrl = $"https://en.wikipedia.org/wiki/{q.Author}",
                        QuoteCount = 1
                    });  
                }
            }

            return authors;
        }
    }
}