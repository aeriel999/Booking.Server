using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.GetPostListForRealtor;
public class GetPostListForRealtorQueryValidation : AbstractValidator<GetPostListForRealtorQuery>
{
    public GetPostListForRealtorQueryValidation()
    {
		RuleFor(r => r.Page).NotEmpty().WithMessage("Required field must not be empty.");

		RuleFor(r => r.SizeOfPage).NotEmpty().WithMessage("Required field must not be empty.");

		RuleFor(r => r.UserId.ToString()).NotEmpty().WithMessage("Required field must not be empty.").IsGuid();
	}
}
