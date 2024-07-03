﻿using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Users.Realtor.GetFeedbacks;
public class GetFeedbacksQueryValidation:AbstractValidator<GetFeedbacksQuery>
{
    public GetFeedbacksQueryValidation()
    {
        RuleFor(x => x.Id.ToString())
           .NotEmpty().WithMessage("{ProperyName} must be not empty")
           .IsGuid();

        RuleFor(x => x.Page)
           .NotEmpty().WithMessage("{PropertyName} must not be empty")
           .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

        RuleFor(x => x.SizeOfPage)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x => x.Equals(10)).WithMessage("{PropertyName} should be 10");
    }
}

