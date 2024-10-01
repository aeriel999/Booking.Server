using FluentValidation;

namespace Booking.Application.Users.Client.GetListOfAllUsersForAdmin;

public class GetListOfAllUsersForAdminQueryValidation : AbstractValidator<GetListOfAllUsersForAdminQuery>
{
    public GetListOfAllUsersForAdminQueryValidation()
    {

		RuleFor(x => x.UserRole)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.UserId)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(x => x.Page)
		   .NotEmpty().WithMessage("{PropertyName} must not be empty")
		   .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");


		RuleFor(x => x.SizeOfPage)
			.NotEmpty().WithMessage("{PropertyName} must not be empty")
			.GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");
	}
}
