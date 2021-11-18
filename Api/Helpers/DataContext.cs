using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProgrammingQuotesApi.Models;
using BCryptNet = BCrypt.Net.BCrypt;

namespace ProgrammingQuotesApi.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Quote> Quotes { get; set; }

        public DataContext()
        {
            List<User> dummyData = new()
            {
                new User
                {
                    Username = "admin",
                    FirstName = "Admin",
                    LastName = "Adminowsky",
                    Password = BCryptNet.HashPassword("admin"),
                    Role = "Admin"
                },
                new User
                {
                    Username = "daman",
                    Password = BCryptNet.HashPassword("daman"),
                    Role = "User"
                },
                new User
                {
                    Username = "goku",
                    Password = BCryptNet.HashPassword("goku"),
                    Role = "Editor"
                },
            };
            if (!Users.Any())
            {
                Users.AddRange(dummyData);
                SaveChanges();
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("TestDb");
        }
    }
}