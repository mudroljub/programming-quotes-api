using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ProgrammingQuotesApi.Models;

namespace ProgrammingQuotesApi.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        private readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true
        };

        public DataContext()
        {
            InitQuotes();
            InitUsers();
        }

        private void InitQuotes()
        {
            if (Quotes.Any()) return;

            string fileContent = File.ReadAllText("Data/quotes.json");
            List<Quote> quotes = JsonSerializer.Deserialize<List<Quote>>(fileContent, JsonOptions);

            Quotes.AddRange(quotes);
            SaveChanges();
        }

        private void InitUsers()
        {
            if (Users.Any()) return;

            string fileContent = File.ReadAllText("Data/users.json");
            List<User> users = JsonSerializer.Deserialize<List<User>>(fileContent, JsonOptions);

            Users.AddRange(users);
            SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("TestDb");
        }

    }
}