using Booking.Domain.Chat;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Chat;

public interface IChatRegystryService
{
	Dictionary<Guid, List<UserMessage>> CreateRoom(Guid roomId);


	void AddMessage(Guid roomId, UserMessage message);


	List<UserMessage> GetMessages(Guid roomId);


	List<Guid> GetRooms();


	Task<ErrorOr<Guid>> GetPostIdByChatRoomId(Guid chatRoomId);
}
