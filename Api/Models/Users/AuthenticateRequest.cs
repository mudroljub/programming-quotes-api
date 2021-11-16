using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models.Users
{
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}