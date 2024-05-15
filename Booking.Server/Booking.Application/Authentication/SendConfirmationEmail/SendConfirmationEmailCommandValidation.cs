using FluentValidation;

namespace Booking.Application.Authentication.SendConfirmationEmail;

public class SendConfirmationEmailCommandValidation : AbstractValidator<SendConfirmationEmailCommand>
{
    public SendConfirmationEmailCommandValidation()
    {
		RuleFor(r => r.Email).NotEmpty().WithMessage("{PropertyName} must not be empty")
		   .EmailAddress().WithMessage("{PropertyName} has wrong format")
		   .MinimumLength(5)
		   .MaximumLength(254);

		RuleFor(r => r.BaseUrl).NotEmpty().WithMessage("Required field must not be empty.");
	}
}
