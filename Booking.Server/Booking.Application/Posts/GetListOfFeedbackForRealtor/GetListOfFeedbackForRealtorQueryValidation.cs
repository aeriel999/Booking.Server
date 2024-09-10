using FluentValidation;

namespace Booking.Application.Posts.GetListOfFeedbackForRealtor;

public class GetListOfFeedbackForRealtorQueryValidation : AbstractValidator<GetListOfFeedbackForRealtorQuery>
{
    public GetListOfFeedbackForRealtorQueryValidation()
    {
		 
		RuleFor(f => f.Page)
			.NotEmpty().WithMessage("{PropertyName} must not be empty")
		   .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

		RuleFor(f => f.SizeOfPage)
			.NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
