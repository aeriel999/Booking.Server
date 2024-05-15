using Booking.Domain.Chat;

namespace Booking.Application.Common.Interfaces.Chat;

public interface IChatRoomRepository
{
	Task CreateChatRoomAsync(ChatRoom chatRoom);

	Task SaveChatRoomAsync();

	Task<ChatRoom?> GetChatRoomByIdAsync(Guid roomId);

	Task<List<ChatRoom>> GetChatRoomListWithMessagesByRealtorIdAsync(Guid realtorId);

	Task<List<ChatRoom>> GetChatRoomListWithMessagesByUserIdAsync(Guid userId);

	Task<ChatRoom?> GetChatRoomForUserIdAndPostIdAsync(Guid userId, Guid postId);
}
