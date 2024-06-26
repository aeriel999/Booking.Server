using FluentValidation;

namespace Booking.Application.Users.Realtor.GetFeedbacks;
public class GetFeedbacksQueryValidation:AbstractValidator<GetFeedbacksQuery>
{
    public GetFeedbacksQueryValidation()
    {
        RuleFor(x => x.id)
           .NotEmpty().WithMessage("{ProperyName} must be not empty");

        RuleFor(x => x.page)
           .NotEmpty().WithMessage("{PropertyName} must not be empty")
           .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

        RuleFor(x => x.sizeOfPage)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x => x.Equals(10)).WithMessage("{PropertyName} should be 10");
    }
}

