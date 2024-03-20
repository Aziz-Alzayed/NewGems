using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NG.Application.MediatoR.Accounts.Admins.Repos;
using NG.Application.MediatoR.Accounts.Auth.Repos;
using NG.DataCore.Models.Users;
using NG.Infrastructure.CommonServices.EndPointsRegisterServices;
using NG.Infrastructure.EmailServices;
using NG.Infrastructure.MediatoR.Accounts.Services;
using System.Web;

namespace NG.Infrastructure.MediatoR.Accounts.Admins.Repos
{
    [AutoRegister(ServiceLifetime.Scoped)]
    public class AdminCommandsRepo(
       UserManager<ApplicationUser> userManager,
       IAuthCommandsRepo authRepository,
       IAccountService accountService,
       IEmailService emailService,
       RoleManager<IdentityRole<Guid>> roleManager
       ) : IAdminCommandsRepo
    {

        public async Task AddNewUserAsync(ApplicationUser user, string resetPasswordUrl)
        {
            try
            {
                // Create the user with no password
                var result = await userManager.CreateAsync(user);
                if (!result.Succeeded)
                {
                    throw new InvalidOperationException("Could not create user.");
                }


                // Generate the password reset token
                var token = await userManager.GeneratePasswordResetTokenAsync(user);

                // URL Encode the token to ensure it's safely transmitted via URL
                var encodedToken = HttpUtility.UrlEncode(token);

                // Construct the reset link to be sent via email
                var resetLink = $"{resetPasswordUrl}/?token={encodedToken}&email={HttpUtility.UrlEncode(user.Email)}";

                // Prepare the email content
                var emailSubject = "Set Up Your Password";
                var emailBody = $"Welcome {user.FirstName}, please set up your password by clicking <a href='{resetLink}'>here</a>.";

                // Send the email
                await emailService.SendEmailAsync(user.Email, emailSubject, emailBody);

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"An error occurred while creating the user: {ex.Message}", ex);
            }
        }

        public async Task AddRolesAsync(ApplicationUser user, List<string> roles)
        {
            try
            {
                // If roles are specified, add the user to these roles
                if (roles != null && roles.Count > 0)
                {
                    foreach (var role in roles)
                    {
                        var addToRoleResult = await userManager.AddToRoleAsync(user, role);
                        if (!addToRoleResult.Succeeded)
                        {
                            throw new InvalidOperationException($"Failed to add user to role {role}.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"An error occurred while Adding Roles to a user: {ex.Message}", ex);
            }
        }

        public async Task DeleteUserByIdAsync(ApplicationUser user)
        {
            try
            {
                authRepository.LogoutUser(user.Email);

                var result = await userManager.DeleteAsync(user);

                if (!result.Succeeded)
                    throw new Exception("Cannot delete this user!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateRolesAsync(ApplicationUser user, List<string> roles)
        {
            try
            {
                // Get current roles of the user
                var currentRoles = await userManager.GetRolesAsync(user);

                // Determine roles to add and remove
                var rolesToAdd = roles.Except(currentRoles);
                var rolesToRemove = currentRoles.Except(roles);

                // Add user to new roles
                foreach (var role in rolesToAdd)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        // Optionally, create the role if it doesn't exist
                        // var result = await roleManager.CreateAsync(new IdentityRole(role));
                        // if (!result.Succeeded) continue; // Handle error or log
                        continue; // Skip adding the user to a non-existent role
                    }
                    await userManager.AddToRoleAsync(user, role);
                }

                // Remove user from old roles
                foreach (var role in rolesToRemove)
                {
                    await userManager.RemoveFromRoleAsync(user, role);
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"An error occurred while updating user roles: {ex.Message}", ex);
            }
        }


        public async Task UpdateUserAsync(ApplicationUser user)
        {
            try
            {
                // Update user information
                var result = await userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    throw new InvalidOperationException("Failed to update user.");
                }

                // Prepare and send the notification email
                var emailSubject = "Your Account Has Been Updated";
                var emailBody = "Dear " + user.FirstName + ",\n\nYour account information has been successfully updated.";
                await emailService.SendEmailAsync(user.Email, emailSubject, emailBody);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"An error occurred while updating the user: {ex.Message}", ex);
            }
        }
    }
}
