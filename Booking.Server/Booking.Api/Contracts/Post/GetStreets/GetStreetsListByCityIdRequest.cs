using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Post.GetStreets;

public record GetStreetsListByCityIdRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid CityId { get; init; }
}
