using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Post.EditRoom;

public record EditRoomRequest
{

	public required Guid Id { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Range(1, 20)]
	public required int NumberOfGuests { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Range(1, 1000)]
	public required int NumberOfRooms { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Range(0, 9999999999999999.99, ErrorMessage = "{PropertyName} must be between {1} and {2}")]
	public required decimal Price { get; init; }


	public int? Discount { get; init; }


	public IFormFile? MainImage { get; init; }
}
