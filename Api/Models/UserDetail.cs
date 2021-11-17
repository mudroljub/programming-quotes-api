namespace ProgrammingQuotesApi.Models
{
    public class UserDetail : User
    {
        public string Token { get; set; }

        public UserDetail(User user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Username = user.Username;
            Role = user.Role;
            Token = token;
        }
    }
}