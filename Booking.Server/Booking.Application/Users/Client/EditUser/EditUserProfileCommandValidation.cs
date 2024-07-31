using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Users.Client.EditUser;
public class EditUserProfileCommandValidation : AbstractValidator<EditUserProfileCommand>
{
	public EditUserProfileCommandValidation()
	{
		RuleFor(x => x.Id.ToString())
			 .NotEmpty().WithMessage("{ProperyName} must be not empty")
			 .IsGuid();

		RuleFor(x => x.Email)
			.EmailAddress().WithMessage("{PropertyName} is in the wrong format");
	}
}

