namespace Booking.Api.Contracts.Post.EditRoom;

public record EditRoomResponse
{
	public Guid Id { get; init; }

	public int NumberOfGuests { get; init; }

	public int NumberOfRooms { get; init; }

	public int? Discount { get; init; }

	public decimal Price { get; init; }

	public required string MainImage { get; init; }
}
