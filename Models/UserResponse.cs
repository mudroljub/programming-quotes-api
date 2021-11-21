using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProgrammingQuotesApi.Models
{
    public class UserResponse : User
    {
        private new string Password { get; set; }
        [Required]
        public string Token { get; set; }
    }
}