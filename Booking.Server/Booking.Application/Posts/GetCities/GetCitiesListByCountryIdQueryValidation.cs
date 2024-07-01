using FluentValidation;

namespace Booking.Application.Posts.GetCities;

public class GetCitiesListByCountryIdQueryValidation : AbstractValidator<GetCitiesListByCountryIdQuery>
{
    public GetCitiesListByCountryIdQueryValidation()
    {
		RuleFor(r => r.ContryId).NotEmpty().WithMessage("Field must not be empty");
	}
}
