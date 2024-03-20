using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Users
{
    public class ResetForgetPasswordDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
    public class ResetForgetPasswordDtoValidator : AbstractValidator<ResetForgetPasswordDto>
    {
        public ResetForgetPasswordDtoValidator()
        {
            RuleFor(dto => dto.Email).NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Invalid email address.");
            RuleFor(dto => dto.Token).NotEmpty().WithMessage("Token name is required.");
            RuleFor(dto => dto.NewPassword).NotEmpty().WithMessage("NewPassword is required.").IsPassword();
        }
    }
}
