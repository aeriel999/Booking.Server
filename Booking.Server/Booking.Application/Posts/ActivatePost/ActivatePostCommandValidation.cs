using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.ActivatePost;

public class ActivatePostCommandValidation : AbstractValidator<ActivatePostCommand>
{
    public ActivatePostCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.PostId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.Role).NotEmpty().WithMessage("Field must not be empty");
	}
}
