using MediatR;
using NG.Application.Exceptions;
using NG.Application.MediatoR.Accounts.Admins.Commands;
using NG.Application.MediatoR.Accounts.Admins.Repos;
using NG.Infrastructure.MediatoR.Accounts.Auth.Services;
using NG.Infrastructure.MediatoR.Accounts.Services;

namespace NG.Infrastructure.MediatoR.Accounts.Admins.Commands
{
    public class UpdateUserByAdminCommandHandler
         (
        IAdminCommandsRepo adminCommandsRepo,
        IAccountService accountService,
        IRolesService rolesService
        )
        : IRequestHandler<UpdateUserByAdminCommand>
    {
        public async Task Handle(UpdateUserByAdminCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var requestedDto = request.EditUserDto;
                var user = await accountService.GetUserAsync(requestedDto.Id);
                if (user == null)
                    throw new NotFoundException("User has been not been found to update!");


                // Validate the roles
                var validatedRoles = rolesService.ValidateRoles(requestedDto.Roles.ToList());
                if (!validatedRoles.Any())
                {
                    throw new UnauthorizedAccessException("One or more of the requested roles are not allowed.");
                }


                bool canAssign = await accountService.CanAssignRolesAsync(request.UpdatedBy, validatedRoles.ToArray());
                if (!canAssign)
                {
                    throw new UnauthorizedAccessException("You do not have permission to assign one or more of the requested roles.");
                }


                user.FirstName = requestedDto.FirstName;
                user.LastName = requestedDto.LastName;
                user.PhoneNumber = requestedDto.PhoneNumber;
                user.Email = requestedDto.Email;
                user.ModifiedOn = DateTime.UtcNow;

                await adminCommandsRepo.UpdateUserAsync(user);
                await adminCommandsRepo.UpdateRolesAsync(user, validatedRoles);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
