using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Users
{
    public class UpdateUserPasswordDto
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class UpdateUserPasswordDtoValidator : AbstractValidator<UpdateUserPasswordDto>
    {
        public UpdateUserPasswordDtoValidator()
        {
            RuleFor(dto => dto.OldPassword).NotEmpty().WithMessage("OldPassword is required.");
            RuleFor(dto => dto.NewPassword).NotEmpty().WithMessage("NewPassword name is required.").IsPassword();
        }
    }
}
