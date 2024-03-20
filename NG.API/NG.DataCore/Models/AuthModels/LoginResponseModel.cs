using NG.DataCore.Models.JwtModels;
using NG.DataCore.Models.Users;

namespace NG.DataCore.Models.AuthModels
{
    public class LoginResponseModel
    {
        public ApplicationUser User { get; set; }
        public JwtAuthModel JwtAuth { get; set; }
    }
}
