using Booking.Application.Chat.GetChatRoomsListForClient;
using Booking.Domain.Chat;

namespace Booking.Application.Common.Interfaces.Chat;

public interface IChatRoomRepository
{
	Task CreateChatRoomAsync(ChatRoom chatRoom);


	Task SaveChatRoomAsync();


	Task UpdateChatRoomAsync(ChatRoom chatRoom);


	Task<ChatRoom?> GetChatRoomByIdAsync(Guid roomId);


	Task<List<ChatRoom>> GetChatRoomListWithMessagesByRealtorIdAsync(Guid realtorId);


	Task<List<ChatRoom>> GetChatRoomListWithMessagesByUserIdAsync(Guid userId);


	Task<ChatRoom?> GetChatRoomForUserIdAndPostIdAsync(Guid userId, Guid postId);


	Task<List<ChatRoom>?> GetChatRoomListByPostId(Guid postId);


	Task<List<Guid>> GetRealtorChatRoomsIdByClient(Guid clientId);


	Task<List<ChatRoomForClient>> GetListOfChatRoomsForClientByRealtorId(Guid realtorId, Guid clientId);



   // Task<List<ChatRoom>> GetChatRoomListByRealtorIdAsync(Guid realtorId);


	Task<ChatRoom?> GetChatRoomByPostIdAndUserIdAsync(Guid userId, Guid postId);


	Task<List<Guid>?> GetChatRoomIdListByRealtorIdAsync(Guid realtorId);


	Task<List<Guid>?> GetChatRoomIdListByUserIdAsync(Guid userId);


	Task<bool> CheckChatForClientIsExist(Guid userId, Guid postId);


	Task<ChatRoom?> GetIncludeChatRoomByIdAsync(Guid roomId);


	Task<int> GetNumberOfUnreadMessagesAsync(Guid realtorId);
}
