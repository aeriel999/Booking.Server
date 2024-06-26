using FluentValidation;

namespace Booking.Application.Authentication.GoogleLogin;

public class GoogleLoginUserCommandValidation : AbstractValidator<GoogleLoginUserCommand>
{
    public GoogleLoginUserCommandValidation()
    {
		RuleFor(r => r.GoogleToken).NotEmpty().WithMessage("Field must not be empty")
			.MaximumLength(4096).MinimumLength(256);
	}
}
 