using FluentValidation;

namespace Booking.Application.Posts.ArchivePost;

public class ArchivePostCommandValidation : AbstractValidator<ArchivePostCommand>
{
    public ArchivePostCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.PostId).NotEmpty().WithMessage("Field must not be empty");
	}
}
