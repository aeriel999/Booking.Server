﻿using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.DeletePost;

public class DeletePostCommandValidation : AbstractValidator<DeletePostCommand>
{
	public DeletePostCommandValidation()
	{
		RuleFor(r => r.UserId.ToString()).NotEmpty().WithMessage("Field must not be empty").IsGuid();

		RuleFor(r => r.PostId.ToString()).NotEmpty().WithMessage("Field must not be empty").IsGuid();
	}
}


