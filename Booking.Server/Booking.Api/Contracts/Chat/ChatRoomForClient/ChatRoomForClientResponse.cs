using Booking.Domain.Chat;

namespace Booking.Api.Contracts.Chat.ChatRoomForClient;
public record ChatRoomForClientResponse
{
    public required string PostImage { get; init; }
    public required string PostName { get; init; }
    public required string RealtorAvatar { get; init; }
    public required string RealtorName { get; init; }
}

