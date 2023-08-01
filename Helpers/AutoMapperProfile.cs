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
            CreateMap<UserUpdate, User>()
                .ForAllMembers(x => x.Condition((src, dest, prop) =>
                    {
                        // ignore empty fields
                        if (prop == null) return false;
                        if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                        return true;
                    }
                ));
        }
    }
}