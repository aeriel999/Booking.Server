namespace Booking.Api.Contracts.Chat.GetChatMessageInfo;

public record GetChatMessageInfoResponse
{
    public required Guid UserId { get; set; }


	public required string SentAt { get; set; }


	public required string Text { get; set; }


	public required bool IsRead { get; set; }


    public DateTime? Date { get; set; }
}
