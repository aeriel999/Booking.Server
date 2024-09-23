namespace Booking.Application.Chat.GetNewMessageInfo;

public record GetNewMessageInfoResponse
{
	public required Guid ChatRoomId { get; set; }

	public required string Message { get; set; }

	public required Guid PostId { get; set; }
}
