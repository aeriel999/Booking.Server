using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.GetRealtorsByUserFeedbacks;
public class GetPostsByUserFeedbacksQueryValidation : AbstractValidator<GetPostsByUserFeedbacksQuery>
{
    public GetPostsByUserFeedbacksQueryValidation()
    {
        RuleFor(x => x.Id.ToString())
            .NotEmpty().WithMessage("{ProperyName} must be not empty")
            .IsGuid();
    }
}

