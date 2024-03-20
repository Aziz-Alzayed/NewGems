using MediatR;
using NG.Application.MediatoR.Accounts.Auth.Commands;
using NG.Application.MediatoR.Accounts.Auth.Repos;

namespace NG.Infrastructure.MediatoR.Accounts.Auth.Commands
{
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand>
    {
        private readonly IAuthCommandsRepo _authCommandsRepo;

        public LogoutCommandHandler(IAuthCommandsRepo authCommandsRepo)
        {
            _authCommandsRepo = authCommandsRepo;
        }
        public Task Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _authCommandsRepo.LogoutUser(request.UserEmail);
                return Task.CompletedTask;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
