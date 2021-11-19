using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProgrammingQuotesApi.Models
{
    public class User : UserNew
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FirstName { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string LastName { get; set; }
        [DefaultValue("User")] // not working
        public string Role { get; set; }
    }
}