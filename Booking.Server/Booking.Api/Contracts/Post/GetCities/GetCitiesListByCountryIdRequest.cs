using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Post.GetCities;

public record GetCitiesListByCountryIdRequest
{
	//[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid? CountryId { get; init; }
}
 