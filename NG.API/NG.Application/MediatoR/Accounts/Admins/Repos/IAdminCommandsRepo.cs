using NG.DataCore.Models.Users;

namespace NG.Application.MediatoR.Accounts.Admins.Repos
{
    public interface IAdminCommandsRepo
    {
        Task AddNewUserAsync(ApplicationUser user, string resetPasswordUrl);
        Task UpdateUserAsync(ApplicationUser user);
        Task AddRolesAsync(ApplicationUser user, List<string> roles);
        Task UpdateRolesAsync(ApplicationUser user, List<string> roles);
        Task DeleteUserByIdAsync(ApplicationUser user);
    }
}
