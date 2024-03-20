using MediatR;
using NG.Application.DTOs.Admins;

namespace NG.Application.MediatoR.Accounts.Admins.Commands
{
    public class UpdateUserByAdminCommand : IRequest
    {
        public UpdateUserByAdminCommand(UpdateUserDto editUserDto, string updatedBy)
        {
            EditUserDto = editUserDto;
            UpdatedBy = updatedBy;
        }

        public UpdateUserDto EditUserDto { get; set; }
        public string UpdatedBy { get; set; }
    }
}
