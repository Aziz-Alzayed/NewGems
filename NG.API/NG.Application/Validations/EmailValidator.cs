using FluentValidation;

namespace NG.Application.Validations
{
    public class EmailValidator : AbstractValidator<string>
    {
        public EmailValidator()
        {
            RuleFor(email => email)
                .NotEmpty().WithMessage("User Email is required.")
                .EmailAddress().WithMessage("User Email must be a valid email address.");
        }
    }
}
