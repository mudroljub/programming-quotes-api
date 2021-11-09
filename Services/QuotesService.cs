using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using System.Text.Json;
using System.IO;
using System;

namespace ProgrammingQuotesApi.Services
{
    public static class QuotesService
    {
        static List<Quote> Quotes { get; }

        static QuotesService()
        {
          var options = new JsonSerializerOptions
          {
              PropertyNameCaseInsensitive = true
          };
          string fileContent = File.ReadAllText("Data/quotes.json");
          Quotes = JsonSerializer.Deserialize<List<Quote>>(fileContent, options);
        }

        public static List<Quote> GetAll() => Quotes;

        public static Quote Get(string id) => Quotes.FirstOrDefault(p => p.Id == id);

        public static Quote GetRandom() => Quotes[new Random().Next(0, Quotes.Count)];

        public static void Add(Quote quote)
        {
            quote.Id = ObjectId.GenerateNewId().ToString();
            Quotes.Add(quote);
        }

        public static void Delete(string id)
        {
            var quote = Get(id);
            if(quote is null)
                return;

            Quotes.Remove(quote);
        }

        public static void Update(Quote quote)
        {
            var index = Quotes.FindIndex(p => p.Id == quote.Id);
            if(index == -1)
                return;

            Quotes[index] = quote;
        }
    }
}