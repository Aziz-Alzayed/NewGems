using NG.DataCore.Models.AuthModels;
using NG.DataCore.Models.JwtModels;
using NG.DataCore.Models.Users;

namespace NG.Application.MediatoR.Accounts.Auth.Repos
{
    public interface IAuthCommandsRepo
    {
        public Task<LoginResponseModel> LoginAsync(ApplicationUser user, string userPassword);
        public void LogoutUser(string userName);
        public Task<JwtAuthModel> RefreshTokenAsync(string accessToke, string refreshToken);
    }
}
