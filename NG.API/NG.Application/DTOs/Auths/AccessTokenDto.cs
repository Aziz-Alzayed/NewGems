using NG.Application.DTOs.Users;

namespace NG.Application.DTOs.Auths
{
    public class AccessTokenDto
    {
        public UserInfoDto UserInfo { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
