using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Users.Realtor.GetRealtorById;
public class GetRealtorByIdQueryValidation:AbstractValidator<GetRealtorByIdQuery>
{
    public GetRealtorByIdQueryValidation()
    {
        RuleFor(x=>x.Id.ToString())
            .NotEmpty().WithMessage("{ProperyName} must be not empty")
            .IsGuid();
    }
}

