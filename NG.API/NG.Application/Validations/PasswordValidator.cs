using FluentValidation;

namespace NG.Application.Validations
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> IsPassword<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.SetValidator(new PasswordValidator());
        }
    }
    public class PasswordValidator : AbstractValidator<string>
    {
        public PasswordValidator()
        {
            RuleFor(password => password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(PasswordRules.RequiredLength).WithMessage($"Password must be at least {PasswordRules.RequiredLength} characters long.")
                .Matches("[A-Z]").When(_ => PasswordRules.RequireUppercase).WithMessage("Password must contain an uppercase letter.")
                .Matches("[a-z]").When(_ => PasswordRules.RequireLowercase).WithMessage("Password must contain a lowercase letter.")
                .Matches("[0-9]").When(_ => PasswordRules.RequireDigit).WithMessage("Password must contain a digit.")
                .Matches("[^a-zA-Z0-9]").When(_ => PasswordRules.RequireNonAlphanumeric).WithMessage("Password must contain a non-alphanumeric character.");
        }
    }
}
