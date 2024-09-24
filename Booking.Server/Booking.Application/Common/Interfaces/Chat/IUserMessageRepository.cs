using Booking.Domain.Chat;

namespace Booking.Application.Common.Interfaces.Chat;

public interface IUserMessageRepository
{
	Task CreateUserMessageAsync(UserMessage userMessage);


	Task SaveUserMessageAsync();


	Task<List<UserMessage>> GetUserMessagesByChatRoomIdAsync(Guid chatRoomId);


	Task UpdateMessageAsync(UserMessage userMessage);
	Task ReadMessagesByChatRoomIdAsync(Guid chatRoomId, Guid userId);

    Task<int> GetCountOfUnreadMessages(List<Guid> chatRoomsId, Guid userId);

    Task<int> GetGeneralCountOfUnreadMessages(Guid userId);
}
