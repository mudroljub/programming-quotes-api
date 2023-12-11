using AutoMapper;
using ProgrammingQuotesApi.Models;

namespace ProgrammingQuotesApi.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserAuthRes>();
            CreateMap<UserRegister, User>();
            CreateMap<UserUpdate, User>().ForAllMembers(x => x.Condition((src, dest, prop) =>
                {
                    // ignore empty fields in update
                    return !(prop == null || ((prop is string str) && str.Length == 0));
                }
            ));
        }
    }
}