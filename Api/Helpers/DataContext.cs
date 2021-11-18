using Microsoft.EntityFrameworkCore;
using ProgrammingQuotesApi.Models;

namespace ProgrammingQuotesApi.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Quote> Quotes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseInMemoryDatabase("TestDb");
        }
    }
}