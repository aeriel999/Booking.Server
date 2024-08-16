using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.GetCities;

public class GetCitiesListByCountryIdQueryValidation : AbstractValidator<GetCitiesListByCountryIdQuery>
{
    public GetCitiesListByCountryIdQueryValidation()
    {
        RuleFor(x => x.CountryId.ToString())
         .NotEmpty().WithMessage("{PropertyName} must not be empty")
         .IsGuid();
    }
}
