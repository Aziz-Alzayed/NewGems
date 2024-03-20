using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NG.DataCore.Authentication;
using NG.DataCore.Models.Users;
using NG.Infrastructure.CommonServices.EndPointsRegisterServices;

namespace NG.Infrastructure.CommonServices.SeedServices
{
    public interface IIdentitySeedService
    {
        Task SeedRoles();
        Task SeedSuperUser();
        Task SeedAdminUser();
        Task SeedUser();
    }
    [AutoRegister(ServiceLifetime.Scoped)]
    public class IdentitySeedService : IIdentitySeedService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;

        public IdentitySeedService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedRoles()
        {
            // Check and create roles
            var roles = new List<string> { AppRoles.Super, AppRoles.Admin, AppRoles.User };
            foreach (var roleName in roles)
            {
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    await _roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
                }
            }
        }
        public async Task SeedAdminUser()
        {
            // Create Admin User
            var adminUser = new ApplicationUser
            {
                UserName = ("admin@example.com").ToUpper(),
                Email = "admin@example.com",
                FirstName = AppRoles.Admin,
                LastName = AppRoles.Admin,
                EmailConfirmed = true
                // Set other properties as necessary
            };

            await CreateUserIfNotExists(adminUser, "AdminPassword123!", AppRoles.Admin);
        }

        public async Task SeedSuperUser()
        {
            // Create Super User
            var superUser = new ApplicationUser
            {
                UserName = ("superuser@example.com").ToUpper(),
                Email = "superuser@example.com",
                FirstName = AppRoles.Super,
                LastName = AppRoles.Super,
                EmailConfirmed = true
                // Set other properties as necessary
            };

            await CreateUserIfNotExists(superUser, "SuperUserPassword123!", AppRoles.Super);
        }

        public async Task SeedUser()
        {
            // Create a regular User
            var user = new ApplicationUser
            {
                UserName = ("user@example.com").ToUpper(),
                Email = "user@example.com",
                FirstName = AppRoles.User,
                LastName = AppRoles.User,
                EmailConfirmed = true
                // Set other properties as necessary
            };

            await CreateUserIfNotExists(user, "UserPassword123!", AppRoles.User);
        }
        private async Task CreateUserIfNotExists(ApplicationUser user, string password, string role)
        {
            if (await _userManager.FindByEmailAsync(user.Email) == null)
            {
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }
        }
    }
}
