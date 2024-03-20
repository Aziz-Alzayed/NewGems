using MediatR;
using NG.Application.DTOs.Auths;
using NG.Application.MediatoR.Accounts.Auth.Commands;
using NG.Application.MediatoR.Accounts.Auth.Repos;

namespace NG.Infrastructure.MediatoR.Accounts.Auth.Commands
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshAccessTokenDto>
    {
        private readonly IAuthCommandsRepo _authCommandsRepo;

        public RefreshTokenCommandHandler(IAuthCommandsRepo authCommandsRepo)
        {
            _authCommandsRepo = authCommandsRepo;
        }
        public async Task<RefreshAccessTokenDto> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var result = await _authCommandsRepo.RefreshTokenAsync(request.AccessToken, request.RefreshToken);
                return new RefreshAccessTokenDto { AccessToken = result.AccessToken, RefreshToken = result.RefreshToken };
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
