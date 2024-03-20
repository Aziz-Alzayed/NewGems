using AutoMapper;
using MediatR;
using NG.Application.DTOs.Admins;
using NG.Application.MediatoR.Accounts.Admins.Commands;
using NG.Application.MediatoR.Accounts.Admins.Repos;
using NG.DataCore.Models.Users;
using NG.Infrastructure.MediatoR.Accounts.Auth.Services;
using NG.Infrastructure.MediatoR.Accounts.Services;

namespace NG.Infrastructure.MediatoR.Accounts.Admins.Commands
{
    public class AddNewUserCommandHandler
       (
       IAdminCommandsRepo adminCommandsRepo,
       IAdminQueriesRepo adminQueriesRepo,
       IAccountService accountService,
       IRolesService rolesService,
       IMapper mapper
       )
       : IRequestHandler<AddNewUserCommand, UserFullInfoDto>
    {

        public async Task<UserFullInfoDto> Handle(AddNewUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var requestedDto = request.AddNewUserDto;

                // Validate the roles
                var validatedRoles = rolesService.ValidateRoles(requestedDto.Roles.ToList());
                if (!validatedRoles.Any())
                {
                    throw new UnauthorizedAccessException("One or more of the requested roles are not allowed.");
                }


                bool canAssign = await accountService.CanAssignRolesAsync(request.AddedBy, validatedRoles.ToArray());
                if (!canAssign)
                {
                    throw new UnauthorizedAccessException("You do not have permission to assign one or more of the requested roles.");
                }

                var newApplicationUser = new ApplicationUser()
                {
                    FirstName = requestedDto.FirstName,
                    LastName = requestedDto.LastName,
                    UserName = requestedDto.Email,
                    PhoneNumber = requestedDto.PhoneNumber,
                    Email = requestedDto.Email,
                    CreatedOn = DateTime.UtcNow
                };

                await adminCommandsRepo.AddNewUserAsync(newApplicationUser, requestedDto.ResetURL);
                await adminCommandsRepo.AddRolesAsync(newApplicationUser, validatedRoles);

                var userWithRoles = await adminQueriesRepo.GetlApplicationUserWithRolesAsync(newApplicationUser);
                return mapper.Map<UserFullInfoDto>(userWithRoles);
            }
            catch
            {

                throw;
            }
        }
    }
}
