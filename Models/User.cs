using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ProgrammingQuotesApi.Models
{
    [Index(nameof(Username), IsUnique = true)] // not working?
    public class User
    {
        public User()
        {
            favoriteQuotes = new HashSet<Quote>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [JsonIgnore]
        [Required]
        public string Password { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)] // ignore null
        public string FirstName { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LastName { get; set; }

        [DefaultValue("User")]
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Role { get; set; }

        public HashSet<Quote> favoriteQuotes { get; set; }
    }
}