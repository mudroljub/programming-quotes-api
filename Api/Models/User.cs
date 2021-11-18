using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace ProgrammingQuotesApi.Models
{
    public class User
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FirstName { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LastName { get; set; }
        [Required]
        public string Username { get; set; }
        // [DefaultValue("User")] // not working
        public string Role { get; set; }
        [Required]
        [IgnoreDataMember]
        public string Password { get; set; }
        [IgnoreDataMember]
        public string PasswordHash { get; set; }
    }
}