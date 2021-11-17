using ProgrammingQuotesApi.Entities;

namespace ProgrammingQuotesApi.Models.Users
{
    public class AuthenticateResponse : User
    {
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
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