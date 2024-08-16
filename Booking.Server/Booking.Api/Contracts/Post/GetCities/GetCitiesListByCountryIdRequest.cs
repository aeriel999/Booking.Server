namespace Booking.Api.Contracts.Post.GetCities;

public record GetCitiesListByCountryIdRequest
{
	public Guid CountryId { get; init; }
}
 