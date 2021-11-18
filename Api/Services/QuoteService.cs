using ProgrammingQuotesApi.Models;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using System.Text.Json;
using System.IO;
using System;

namespace ProgrammingQuotesApi.Services
{
    public class QuoteService
    {
        List<Quote> Quotes { get; }

        public QuoteService()
        {
          var options = new JsonSerializerOptions
          {
              PropertyNameCaseInsensitive = true
          };
          string fileContent = File.ReadAllText("Data/quotes.json");
          Quotes = JsonSerializer.Deserialize<List<Quote>>(fileContent, options);
        }

        public List<Quote> GetAll(int count = 0)
        {
            if (count <= 0 || count > Quotes.Count) return Quotes;

            return Quotes.GetRange(0, count);
        }

        public Quote GetById(string id) => Quotes.FirstOrDefault(p => p.Id == id);

        public Quote GetRandom() => Quotes[new Random().Next(0, Quotes.Count)];

        public List<Quote> GetByAuthor(string author) => Quotes.Where(p => p.Author == author).ToList();

        public void Add(Quote quote)
        {
            quote.Id = ObjectId.GenerateNewId().ToString();
            Quotes.Add(quote);
        }

        public void Delete(string id)
        {
            var quote = GetById(id);
            if (quote is null)
                return;

            Quotes.Remove(quote);
        }

        public void Update(Quote quote)
        {
            var index = Quotes.FindIndex(p => p.Id == quote.Id);
            if(index == -1)
                return;

            Quotes[index] = quote;
        }
    }
}