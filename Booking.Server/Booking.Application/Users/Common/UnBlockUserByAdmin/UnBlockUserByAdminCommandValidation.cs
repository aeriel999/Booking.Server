using FluentValidation;

namespace Booking.Application.Users.Common.UnBlockUserByAdmin;

public class UnBlockUserByAdminCommandValidation : AbstractValidator<UnBlockUserByAdminCommand>
{
    public UnBlockUserByAdminCommandValidation()
    {
		RuleFor(x => x.UserRole)
	   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.UserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.CurrentUserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
