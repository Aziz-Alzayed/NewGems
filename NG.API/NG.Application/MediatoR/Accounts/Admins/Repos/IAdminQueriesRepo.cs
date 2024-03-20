using NG.Application.Models.Admin;
using NG.DataCore.Models.Users;

namespace NG.Application.MediatoR.Accounts.Admins.Repos
{
    public interface IAdminQueriesRepo
    {
        public Task<List<UserWithRolesModel>> GetAllApplicationUsersWithRolesAsync();
        public Task<UserWithRolesModel> GetlApplicationUserWithRolesAsync(ApplicationUser user);
    }
}
