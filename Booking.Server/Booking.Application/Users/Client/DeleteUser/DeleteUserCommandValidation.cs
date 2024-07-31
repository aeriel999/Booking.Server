using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Users.Client.DeleteUser;
public class DeleteUserCommandValidation : AbstractValidator<DeleteUserCommand>
{
	public DeleteUserCommandValidation()
	{
		RuleFor(x => x.Id.ToString())
			.NotEmpty().WithMessage("{ProperyName} must be not empty")
			.IsGuid();
	}
}

