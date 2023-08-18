using AutoMapper;
using ProgrammingQuotesApi.Models;

namespace ProgrammingQuotesApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserAuthRes>();
            CreateMap<UserRegister, User>();
            CreateMap<UserUpdate, User>().ForAllMembers(x => x.Condition((src, dest, prop) =>
                {
                    // ignore empty fields in update
                    return !(prop is null || ((prop is string str) && str.Length == 0));
                }
            ));
        }
    }
}