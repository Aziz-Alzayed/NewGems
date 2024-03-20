using AutoMapper;
using NG.Application.DTOs.Users;
using NG.DataCore.Models.Users;

namespace NG.Infrastructure.Mapping.Users
{
    public class ApplicationUserProfile : Profile
    {
        public ApplicationUserProfile()
        {
            CreateMap<ApplicationUser, UserInfoDto>().ReverseMap();
        }
    }
}
