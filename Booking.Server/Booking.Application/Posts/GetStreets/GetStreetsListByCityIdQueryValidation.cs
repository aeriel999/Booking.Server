using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.GetStreets;

public class GetStreetsListByCityIdQueryValidation : AbstractValidator<GetStreetsListByCityIdQuery>
{
    public GetStreetsListByCityIdQueryValidation()
    {
        RuleFor(x => x.CityId.ToString())
         .NotEmpty().WithMessage("{PropertyName} must not be empty")
         .IsGuid();
    }
}
