using FluentValidation;

namespace NG.Application.Validations
{
    public static class ReturnURLValidatorExtensions
    {
        public static IRuleBuilder<T, string> IsReturnURL<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.SetValidator(new ReturnURLValidator());
        }
    }
    public class ReturnURLValidator : AbstractValidator<string>
    {

        public ReturnURLValidator()
        {
            RuleFor(x => x)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Return URL is required.")
                .Must(BeAValidHttpsUrl).WithMessage(@"URL must start with https://.");
        }

        private bool BeAValidHttpsUrl(string returnUrl)
        {
            return !string.IsNullOrEmpty(returnUrl) && returnUrl.StartsWith(@"https://");
        }
    }
}
