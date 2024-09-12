namespace Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;

public record GetListOfChatsByPostInfoForRealtorResponse
{
    public required Guid ChatId { get; set; }


    public required string ChatName { get; set; }


	public required string Image { get; set; }


	public required int NumberOfUnreadMessages { get; set; }
}
