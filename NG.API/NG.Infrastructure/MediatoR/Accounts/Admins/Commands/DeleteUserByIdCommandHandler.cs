using MediatR;
using NG.Application.MediatoR.Accounts.Admins.Commands;
using NG.Application.MediatoR.Accounts.Admins.Repos;
using NG.Infrastructure.MediatoR.Accounts.Services;

namespace NG.Infrastructure.MediatoR.Accounts.Admins.Commands
{
    public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand>
    {

        private readonly IAdminCommandsRepo _adminCommandsRepo;
        private readonly IAccountService _accountService;

        public DeleteUserByIdCommandHandler(IAdminCommandsRepo adminCommandsRepo, IAccountService accountService)
        {
            _accountService = accountService;
            _adminCommandsRepo = adminCommandsRepo;
        }

        public async Task Handle(DeleteUserByIdCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _accountService.GetUserAsync(request.UserId);
                var editedBy = await _accountService.GetUserByEmailAsync(request.EditedBy);
                var editedByIsSuper = await _accountService.IsSuperUserAsync(editedBy);
                var editedByIsAdmin = await _accountService.IsAdminUserAsync(editedBy);
                var userIsSuper = await _accountService.IsSuperUserAsync(user);
                var userIsAdmin = await _accountService.IsAdminUserAsync(user);

                if (editedByIsSuper)
                {
                    await _adminCommandsRepo.DeleteUserByIdAsync(user);
                }
                else if (editedByIsAdmin && !userIsAdmin && !userIsSuper)
                {
                    await _adminCommandsRepo.DeleteUserByIdAsync(user);
                }
                else
                {
                    throw new UnauthorizedAccessException("You do not have permission to delete this user.");
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
