using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using ErrorOr;

namespace Booking.Infrastructure.Services.Chat;

public class ChatRegystryService(IChatRoomRepository chatRoomRepository ) : IChatRegystryService
{
	private readonly Dictionary<Guid, List<UserMessage>> _roomMessages = new();

	public Dictionary<Guid, List<UserMessage>> CreateRoom(Guid roomId)
	{
		_roomMessages[roomId] = new();

		return _roomMessages;
	}

	public void AddMessage(Guid roomId, UserMessage message)
	{
		_roomMessages[roomId].Add(message);
	}

	public List<UserMessage> GetMessages(Guid roomId)
	{
		return _roomMessages[roomId];
	}

	public List<Guid> GetRooms()
	{
		return _roomMessages.Keys.ToList();
	}

	public async Task<ErrorOr<Guid>> GetPostIdByChatRoomId(Guid chatRoomId)
	{ 
		var errorOrChatRoom = await chatRoomRepository.GetChatRoomByIdAsync(chatRoomId);

		if (errorOrChatRoom == null)
			return Error.NotFound();

		return errorOrChatRoom.PostId;
	}

	 
}
