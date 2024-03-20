using AutoMapper;
using NG.Application.DTOs.Admins;
using NG.Application.Models.Admin;

namespace NG.Infrastructure.Mapping.Users
{
    public class AdminMappingProfile : Profile
    {
        public AdminMappingProfile()
        {
            AddFullUserInfo();
        }
        private void AddFullUserInfo()
        {
            CreateMap<UserWithRolesModel, UserFullInfoDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.User.PhoneNumber))
                .ForMember(dest => dest.IsEmailConfirmed, opt => opt.MapFrom(src => src.User.EmailConfirmed))
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles));
        }
    }
}
