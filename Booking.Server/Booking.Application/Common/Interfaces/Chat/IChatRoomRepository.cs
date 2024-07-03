using Booking.Domain.Chat;

namespace Booking.Application.Common.Interfaces.Chat;

public interface IChatRoomRepository
{
	Task CreateChatRoomAsync(ChatRoom chatRoom);


	Task SaveChatRoomAsync();


	Task<ChatRoom?> GetChatRoomByIdAsync(Guid roomId);


	Task<List<ChatRoom>> GetChatRoomListWithPostsByRealtorIdAsync(Guid realtorId);


	Task<List<ChatRoom>> GetChatRoomListWithPostByUserIdAsync(Guid userId);


	Task<ChatRoom?> GetChatRoomForUserIdAndPostIdAsync(Guid userId, Guid postId);


	Task<List<ChatRoom>?> GetChatRoomListByPostId(Guid postId);
}
