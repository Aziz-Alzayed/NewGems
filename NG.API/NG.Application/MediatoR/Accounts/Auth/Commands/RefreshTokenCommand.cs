using MediatR;
using NG.Application.DTOs.Auths;

namespace NG.Application.MediatoR.Accounts.Auth.Commands
{
    public class RefreshTokenCommand : IRequest<RefreshAccessTokenDto>
    {
        public RefreshTokenCommand(string accessToken, string refreshToken)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
