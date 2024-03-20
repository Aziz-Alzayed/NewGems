using FluentValidation;

namespace NG.Application.DTOs.Admins
{
    public class UpdateUserDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string Email { get; set; }
        public string[] Roles { get; set; }
    }
    public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserDtoValidator()
        {
            RuleFor(dto => dto.Id)
           .NotEmpty().WithMessage("Id is required.");

            RuleFor(dto => dto.FirstName)
           .NotEmpty().WithMessage("First name is required.")
           .Length(2, 50).WithMessage("First name must be between 2 and 50 characters.");

            RuleFor(dto => dto.LastName)
                .NotEmpty().WithMessage("Last name is required.")
                .Length(2, 50).WithMessage("Last name must be between 2 and 50 characters.");

            RuleFor(dto => dto.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.")
                .Matches(new System.Text.RegularExpressions.Regex(@"^\+[1-9]\d{1,14}$")).WithMessage("Invalid phone number format.");


            RuleFor(dto => dto.Email).NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Invalid email address.");

            RuleFor(dto => dto.Roles)
            .NotEmpty().WithMessage("At least one role is required.")
            .Must(roles => roles.All(role => !string.IsNullOrEmpty(role))).WithMessage("Roles cannot contain an empty value.");

        }
    }
}
