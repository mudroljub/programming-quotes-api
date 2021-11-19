using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models
{
    public class UserNew
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}