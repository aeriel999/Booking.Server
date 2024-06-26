using FluentValidation;

namespace Booking.Application.Users.Realtor.GetRealtorById;
public class GetRealtorByIdQueryValidation:AbstractValidator<GetRealtorByIdQuery>
{
    public GetRealtorByIdQueryValidation()
    {
        RuleFor(x=>x.id)
            .NotEmpty().WithMessage("{ProperyName} must be not empty");
    }
}

