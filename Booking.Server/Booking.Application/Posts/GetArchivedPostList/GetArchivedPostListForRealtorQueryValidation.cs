using FluentValidation;

namespace Booking.Application.Posts.GetArchivedPostList;

public class GetArchivedPostListForRealtorQueryValidation : AbstractValidator<GetArchivedPostListForRealtorQuery>
{
    public GetArchivedPostListForRealtorQueryValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.Page).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.SizeOfPage).NotEmpty().WithMessage("Field must not be empty");
	}
}
