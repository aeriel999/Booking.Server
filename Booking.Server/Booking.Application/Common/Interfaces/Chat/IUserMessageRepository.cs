using Booking.Domain.Chat;

namespace Booking.Application.Common.Interfaces.Chat;

public interface IUserMessageRepository
{
	Task CreateUserMessageAsync(UserMessage userMessage);

	Task SaveUserMessageAsync();

	Task<List<UserMessage>> GetUserMessagesByChatRoomIdAsync(Guid chatRoomId);
}
