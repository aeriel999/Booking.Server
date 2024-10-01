using FluentValidation;

namespace Booking.Application.Users.Common.DeleteUserByAdmin;

public class DeleteUserByAdminCommandValidation : AbstractValidator<DeleteUserByAdminCommand>
{
    public DeleteUserByAdminCommandValidation()
    {
		RuleFor(x => x.UserRole)
	   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.UserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.CurrentUserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
