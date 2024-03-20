using MediatR;
using NG.Application.DTOs.Auths;

namespace NG.Application.MediatoR.Accounts.Auth.Commands
{
    public class LoginCommand : IRequest<AccessTokenDto>
    {
        public LoginCommand(LoginRequestDto loginRequest)
        {
            this.loginRequest = loginRequest;
        }

        public LoginRequestDto loginRequest { get; set; }
    }
}
