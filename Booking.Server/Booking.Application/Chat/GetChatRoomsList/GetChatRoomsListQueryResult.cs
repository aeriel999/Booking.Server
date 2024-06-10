using Booking.Domain.Chat;

namespace Booking.Application.Chat.GetChatRoomsList;

public record GetChatRoomsListQueryResult(List<PostChatRoomInfo>? ChatRooms, bool HasNewPosts);

public record PostChatRoomInfo(
	bool HasNewMessage, string ChatRoomName, Guid PostId, List<ChatRoomInfo> ChatRoomList);


public record ChatRoomInfo(bool HasNewMessage, string PostName, Guid ChatRoomId);
 
