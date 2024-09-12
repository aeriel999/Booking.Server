using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;

public record GetListOfChatsByPostInfoForRealtorRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid PostId { get; init; }
}
