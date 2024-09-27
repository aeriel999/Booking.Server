using FluentValidation;

namespace Booking.Application.Posts.GetListOfPostsForModeration;

public class GetListOfPostsForModerationQueryValidation : AbstractValidator<GetListOfPostsForModerationQuery>
{
    public GetListOfPostsForModerationQueryValidation()
    {

		RuleFor(x => x.Role)
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
