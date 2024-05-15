using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Chat.CreateChat;

public record CreateChatRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid PostId { get; init; }

}
