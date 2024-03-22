using FluentValidation;

namespace Booking.Application.Authentication.Register;

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
	public RegisterUserCommandValidator()
	{
		RuleFor(r => r.Email).NotEmpty().WithMessage("{PropertyName} must not be empty")
		   .EmailAddress().WithMessage("{PropertyName} has wrong format")
		   .MinimumLength(5)
		   .MaximumLength(254);

		RuleFor(r => r.Password).NotEmpty().WithMessage("{PropertyName} must not be empty")
			 .MaximumLength(24).MinimumLength(8)
			 .Matches("[A-Z]").WithMessage("{PropertyName} must contain one or more capital letters.")
			 .Matches("[a-z]").WithMessage("{PropertyName} must contain one or more lowercase letters.")
			 .Matches(@"\d").WithMessage("{PropertyName} must contain one or more digits.")
			 .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("{PropertyName} must contain one or more special characters.")
			 .Matches("^[^£# “”]*$").WithMessage("{PropertyName} must not contain the following characters £ # “” or spaces."); ;

		//ToDo ??? Is equal enough for ConfirmPassword
		RuleFor(r => r.ConfirmPassword).NotEmpty().WithMessage("Required field must not be empty.")
			.Equal(r => r.Password).WithMessage("Passwords are not matched");

		RuleFor(r => r.BaseUrl).NotEmpty().WithMessage("Required field must not be empty.");
	}
}