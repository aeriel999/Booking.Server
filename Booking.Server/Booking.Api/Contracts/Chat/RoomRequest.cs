using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Chat;

public record RoomRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid RoomId { get; init; }
}
