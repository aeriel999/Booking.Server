using Booking.Application.Common.Behaviors.CustomValidators;
using Booking.Application.Posts.GetFeedbacksByClient;
using FluentValidation;

namespace Booking.Application.Posts.GetHistoryOfFeedbacksByClient;
public class GetHistoryOfFeedbacksByClientQueryValidation : AbstractValidator<GetHistoryOfFeedbacksByClientQuery>
{
    public GetHistoryOfFeedbacksByClientQueryValidation()
    {
        RuleFor(f => f.ClientId.ToString())
           .NotEmpty().WithMessage("{ProperyName} must be not empty")
           .IsGuid();

        RuleFor(f => f.Page)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
           .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

        RuleFor(f => f.SizeOfPage)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x => x.Equals(6)).WithMessage("{PropertyName} should be 6");
    }
}

