using Microsoft.IdentityModel.Tokens;
using ProgrammingQuotesApi.Helpers;
using ProgrammingQuotesApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;

namespace ProgrammingQuotesApi.Services
{
    public static class TokenService
    {
        private const double EXPIRE_DAYS = 7;
        public static string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(EXPIRE_DAYS),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Settings.Secret), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(descriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}