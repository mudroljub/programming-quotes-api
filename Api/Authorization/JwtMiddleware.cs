using Microsoft.AspNetCore.Http;
using ProgrammingQuotesApi.Services;
using System.Linq;
using System.Threading.Tasks;

namespace ProgrammingQuotesApi.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
        {
            string token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            int? userId = jwtUtils.ValidateJwtToken(token);
            if (userId != null)
            {
                // attach user to context
                context.Items["User"] = userService.GetById(userId.Value);
            }
            await _next(context);
        }
    }
}