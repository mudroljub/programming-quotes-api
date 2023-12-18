using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ProgrammingQuotesApi.Models;

namespace ProgrammingQuotesApi.DbContexts
{
    public class ProgrammingContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Quote> Quotes { get; set; }

        private readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true
        };

        public ProgrammingContext()
        {
            Database.EnsureCreated();
            if (!Quotes.Any()) InitQuotes();
            if (!Users.Any()) InitUsers();
        }

        private void InitQuotes()
        {
            string data = File.ReadAllText("Data/quotes.json");
            List<Quote> quotes = JsonSerializer.Deserialize<List<Quote>>(data, JsonOptions);

            Quotes.AddRange(quotes);
            SaveChanges();
        }

        private void InitUsers()
        {
            string data = File.ReadAllText("Data/users.json");
            List<User> users = JsonSerializer.Deserialize<List<User>>(data, JsonOptions);

            Users.AddRange(users);
            SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=ProgrammingQuotes.db");
        }
    }
}