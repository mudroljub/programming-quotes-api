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

        public static IEnumerable<string> GetAuthors()
        {   
            var quotes = QuotesService.GetQuotes();
            // var authors = quotes.Select(q => new Author() { 
            //     Name = q.Author, 
            //     QuotesUrl = $"https://programmingquotesapi.azurewebsites.net/quotes/author/{q.Author}",
            //     WikiUrl = $"https://en.wikipedia.org/wiki/{q.Author}"
            // }).ToList();
            var authors = quotes.Select(q => q.Author).Distinct();
            return authors;
        }
    }
}