using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace ProgrammingQuotesApi.Models
{
    public class UserNew
    {
        [Key]
        [Required]
        public string Username { get; set; }

        [Required]
        // [IgnoreDataMember]
        public string Password { get; set; }
    }
}