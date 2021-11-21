using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models
{
    public class UserResponse
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FirstName { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LastName { get; set; }

        public string Role { get; set; }

        [Required]
        public string Token { get; set; }
    }
}