using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Users.Realtor.GetRealtorsByUserFeedbacks;
public class GetRealtorsByUserFeedbacksQueryValidation : AbstractValidator<GetRealtorsByUserFeedbacksQuery>
{
    public GetRealtorsByUserFeedbacksQueryValidation()
    {
        RuleFor(x => x.Id.ToString())
            .NotEmpty().WithMessage("{ProperyName} must be not empty")
            .IsGuid();
    }
}

