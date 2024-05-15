using Booking.Domain.Chat;

namespace Booking.Application.Chat.GetChatRoomsList;

public record GetChatRoomsListQueryResult(List<ChatRoom>? ChatRooms, bool HasNewPosts);
 
