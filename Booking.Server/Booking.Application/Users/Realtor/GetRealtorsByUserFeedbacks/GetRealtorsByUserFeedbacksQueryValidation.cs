using FluentValidation;

namespace Booking.Application.Users.Realtor.GetRealtorsByUserFeedbacks;
public class GetRealtorsByUserFeedbacksQueryValidation : AbstractValidator<GetRealtorsByUserFeedbacksQuery>
{
    public GetRealtorsByUserFeedbacksQueryValidation()
    {
        RuleFor(x => x.id)
            .NotEmpty().WithMessage("{ProperyName} must be not empty");
    }
}

