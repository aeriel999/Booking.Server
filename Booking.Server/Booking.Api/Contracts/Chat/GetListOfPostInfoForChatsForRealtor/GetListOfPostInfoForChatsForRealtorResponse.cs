namespace Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;

public record GetListOfPostInfoForChatsForRealtorResponse
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

	public required string Image { get; set; }

    public required int NumberOfUnreadMessages { get; set; }
}
