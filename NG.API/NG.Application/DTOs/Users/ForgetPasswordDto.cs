using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Users
{
    public class ForgetPasswordDto
    {
        public string Email { get; set; }
        public string ResetUrl { get; set; }
    }
    public class ForgetPasswordDtoValidator : AbstractValidator<ForgetPasswordDto>
    {
        public ForgetPasswordDtoValidator()
        {
            RuleFor(dto => dto.Email).NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Invalid email address.");
            RuleFor(dto => dto.ResetUrl).IsReturnURL();
        }
    }
}
