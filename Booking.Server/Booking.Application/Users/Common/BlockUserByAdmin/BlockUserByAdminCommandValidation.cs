using FluentValidation;

namespace Booking.Application.Users.Common.BlockUserByAdmin;

public class BlockUserByAdminCommandValidation : AbstractValidator<BlockUserByAdminCommand>
{
    public BlockUserByAdminCommandValidation()
    {

		RuleFor(x => x.UserRole)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.UserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.CurrentUserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
