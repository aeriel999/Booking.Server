using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Chat.SetMessagesReadtByChatId;

public record SetMessagesReadtByChatIdRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid ChatRoomId { get; init; }
}
