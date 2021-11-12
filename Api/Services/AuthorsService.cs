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
        static Dictionary<string, Author> Authors = new Dictionary<string, Author>();
        static AuthorsService()
        {
            var quotes = QuotesService.GetQuotes();
            foreach (var q in quotes)
            {
                if (Authors.ContainsKey(q.Author)) {  
                    Authors[q.Author].QuoteCount++;  
                }
                else {  
                    Authors.Add(q.Author, new Author()
                    {
                        Name = q.Author,
                        QuotesUrl = $"https://programmingquotesapi.azurewebsites.net/quotes/author/{q.Author}",
                        WikiUrl = $"https://en.wikipedia.org/wiki/{q.Author}",
                        QuoteCount = 1
                    });  
                }
            }
        }

        public static Dictionary<string, Author> GetAuthors()
        { 
            return Authors;
        }
    }
}