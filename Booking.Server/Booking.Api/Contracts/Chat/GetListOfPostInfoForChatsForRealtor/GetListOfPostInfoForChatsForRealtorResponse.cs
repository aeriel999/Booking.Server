namespace Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;

public record GetListOfPostInfoForChatsForRealtorResponse
{
    public required Guid PostId { get; set; }

    public required string PostName { get; set; }

	public required string Image { get; set; }

    public required int NumberOfUnreadMessages { get; set; }
}
