using Booking.Domain.Chat;

namespace Booking.Application.Chat.GetChatRoomsListForClient;

public record GetChatRoomsListForClientResult
{
    public Guid RealtorId { get; init; }
    public string? RealtorAvatar { get; init; }

    public string? RealtorName { get; init; }

    public bool HasUnreadMessages { get; init; }

    public int? UnreadMessages { get; init; }

    public ICollection<ChatRoomForClient>? ChatsForClient { get; init; }


}
public record ChatRoomForClient
{
    public Guid ChatRoomId { get; init; }
    public string? PostImage { get; init; }

    public string? PostName { get; init; }

    public bool HasUnreadMessages { get; init; }

    public int? UnreadMessages { get; init; }

}

