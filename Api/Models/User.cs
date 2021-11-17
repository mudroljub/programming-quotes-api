using System.Runtime.Serialization;

namespace ProgrammingQuotesApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        [IgnoreDataMember]
        public string Password { get; set; }
        [IgnoreDataMember]
        public string PasswordHash { get; set; }
    }
}