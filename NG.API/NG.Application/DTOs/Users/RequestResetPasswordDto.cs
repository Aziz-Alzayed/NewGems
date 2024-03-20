using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Users
{
    public class RequestResetPasswordDto
    {
        public string Email { get; set; }
        public string ResetURL { get; set; }
    }
    public class RequestResetPasswordDtoValidator : AbstractValidator<RequestResetPasswordDto>
    {
        public RequestResetPasswordDtoValidator()
        {
            RuleFor(dto => dto.Email).NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Invalid email address.");
            RuleFor(dto => dto.ResetURL).IsReturnURL();

        }
    }
}
