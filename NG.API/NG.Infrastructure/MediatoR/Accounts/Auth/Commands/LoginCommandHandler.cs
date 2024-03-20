using MediatR;
using NG.Application.DTOs.Auths;
using NG.Application.DTOs.Users;
using NG.Application.MediatoR.Accounts.Auth.Commands;
using NG.Application.MediatoR.Accounts.Auth.Repos;
using NG.Infrastructure.MediatoR.Accounts.Services;

namespace NG.Infrastructure.MediatoR.Accounts.Auth.Commands
{
    public class LoginCommandHandler(
        IAuthCommandsRepo authCommandsRepo,
        IAccountService accountService
        )
        : IRequestHandler<LoginCommand, AccessTokenDto>
    {

        public async Task<AccessTokenDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await accountService.GetUserByEmailAsync(request.loginRequest.Email);
                if (user == null)
                {
                    throw new InvalidOperationException("User not found.");
                }

                var result = await authCommandsRepo.LoginAsync(user, request.loginRequest.Password);
                var userInfo = new UserInfoDto
                {
                    Id = result.User.Id,
                    Email = result.User.Email,
                    FirstName = result.User.FirstName,
                    LastName = result.User.LastName,
                    EmailConfirmed = result.User.EmailConfirmed
                };
                return new AccessTokenDto
                {
                    UserInfo = userInfo,
                    AccessToken = result.JwtAuth.AccessToken,
                    RefreshToken = result.JwtAuth.RefreshToken
                };
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
