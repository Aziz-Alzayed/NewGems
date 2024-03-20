using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Users
{
    public class RegisterUserRequestDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string VerificationUrl { get; set; }

    }
    public class RegisterUserRequestDtoValidator : AbstractValidator<RegisterUserRequestDto>
    {
        public RegisterUserRequestDtoValidator()
        {
            RuleFor(dto => dto.FirstName).NotEmpty().WithMessage("First name is required.");
            RuleFor(dto => dto.LastName).NotEmpty().WithMessage("LastName name is required.");
            RuleFor(dto => dto.Email).NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Invalid email address.");
            RuleFor(dto => dto.Password).NotEmpty().WithMessage("Password is required.").IsPassword();
            RuleFor(dto => dto.VerificationUrl).IsReturnURL();
        }
    }
}
