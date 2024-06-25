using FluentValidation;

namespace Booking.Application.Posts.RepostPost;

public class RepostPostCommandValidation : AbstractValidator<RepostPostCommand>
{
    public RepostPostCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.PostId).NotEmpty().WithMessage("Field must not be empty");
	}
}
