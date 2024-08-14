using Booking.Application.Common.Behaviors.CustomValidators;
using Booking.Application.Posts.GetCities;
using FluentValidation;

namespace Booking.Application.Posts.GetCitiesFilteredList;
public class GetCitiesFilteredListQueryValidation : AbstractValidator<GetCitiesFilteredListQuery>
{
    public GetCitiesFilteredListQueryValidation()
    {
        RuleFor(x => x.Country.ToString())
         .NotEmpty().WithMessage("{PropertyName} must not be empty")
         .IsGuid();
    }
}

