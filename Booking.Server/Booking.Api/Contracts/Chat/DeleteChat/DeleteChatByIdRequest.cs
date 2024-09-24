using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Chat.DeleteChat;

public record DeleteChatByIdRequest
{

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid ChatRoomId { get; init; }
}
