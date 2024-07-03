namespace Booking.Application.Chat.GetChatRoomsList;

public record GetChatRoomsListQueryResult(List<ChatsForPostListInfo>? ChatsForPosts, bool HasNewPosts);

public record ChatsForPostListInfo(
	bool HasNewMessage, string ChatRoomName, Guid PostId, List<ChatRoomInfo>? ChatRoomList);


public record ChatRoomInfo(bool HasNewMessage, string PostName, Guid ChatRoomId);
 
