using Microsoft.EntityFrameworkCore;
using ProgrammingQuotesApi.Entities;

namespace ProgrammingQuotesApi.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseInMemoryDatabase("TestDb");
        }
    }
}