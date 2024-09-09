using FluentValidation;

namespace Booking.Application.Posts.GetPostIdListForRealtor;

public class GetPostIdListForRealtorQueryValidation : AbstractValidator<GetPostIdListForRealtorQuery>
{
    public GetPostIdListForRealtorQueryValidation()
    {
		RuleFor(x => x.UserId)
		  .NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
