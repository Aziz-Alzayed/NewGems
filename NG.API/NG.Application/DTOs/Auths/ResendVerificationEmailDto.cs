using FluentValidation;
using NG.Application.Validations;

namespace NG.Application.DTOs.Auths
{
    public class ResendVerificationEmailDto
    {
        public string UserEmail { get; set; }
        public string VerificationUrl { get; set; }
    }
    public class ResendVerificationEmailDtoValidator : AbstractValidator<ResendVerificationEmailDto>
    {
        public ResendVerificationEmailDtoValidator()
        {
            RuleFor(dto => dto.UserEmail).NotEmpty().EmailAddress().WithMessage("It must bee and email!");
            RuleFor(dto => dto.VerificationUrl).IsReturnURL();
        }
    }
}
