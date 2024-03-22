using FluentValidation;

namespace Booking.Application.Authentication.ForgotPassword;

public class ForgotPasswordQueryValidation : AbstractValidator<ForgotPasswordQuery>
{
	public ForgotPasswordQueryValidation()
	{
		RuleFor(r => r.Email).NotEmpty().WithMessage("Field must not be empty")
			.EmailAddress().WithMessage("Wrong email format")
			.MaximumLength(24).MinimumLength(8);

		RuleFor(r => r.BaseUrl).NotEmpty().WithMessage("Required field must not be empty.");
	}
}
