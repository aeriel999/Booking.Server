using FluentValidation;

namespace Booking.Application.Posts.DeletePost;

public class DeletePostCommandValidation : AbstractValidator<DeletePostCommand>
{
	public DeletePostCommandValidation()
	{
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.PostId).NotEmpty().WithMessage("Field must not be empty");
	}
}


