using System.Runtime.Serialization;

namespace ProgrammingQuotesApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }

        [IgnoreDataMember]
        public string PasswordHash { get; set; }
    }
}