using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Users
{
    public class UpdateUserEmailDto
    {
        public string NewEmail { get; set; }
        public string VerificationUrl { get; set; }
    }
    public class UpdateUserEmailDtoValidator : AbstractValidator<UpdateUserEmailDto>
    {
        public UpdateUserEmailDtoValidator()
        {
            RuleFor(dto => dto.NewEmail)
            .NotEmpty().WithMessage("NewEmail is required.")
            .EmailAddress().WithMessage("Invalid email address format.");

            RuleFor(dto => dto.VerificationUrl).IsReturnURL();
        }
    }
}
