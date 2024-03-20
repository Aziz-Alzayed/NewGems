using NG.DataCore.Models.Users;

namespace NG.Application.Models.Admin
{
    public class UserWithRolesModel
    {
        public ApplicationUser User { get; set; }
        public List<string> Roles { get; set; }
    }
}
