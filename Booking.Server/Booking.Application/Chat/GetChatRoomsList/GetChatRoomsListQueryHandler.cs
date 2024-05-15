using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomsList;

public class GetChatRoomsListQueryHandler(
	IChatRoomRepository chatRoomRepository)
	: IRequestHandler<GetChatRoomsListQuery, ErrorOr<GetChatRoomsListQueryResult>>
{
	public async Task<ErrorOr<GetChatRoomsListQueryResult>> Handle(
		GetChatRoomsListQuery request, CancellationToken cancellationToken)
	{
		List<ChatRoom> chatRoomList = new();

		if (request.UserRole == Roles.Realtor)
			chatRoomList = await chatRoomRepository.GetChatRoomListWithMessagesByRealtorIdAsync(
				request.UserId);

		if (request.UserRole == Roles.User)
			chatRoomList = await chatRoomRepository.GetChatRoomListWithMessagesByUserIdAsync(
				request.UserId);

		if(chatRoomList != null)
		{
			foreach (var chatRoom in chatRoomList)
			{
				foreach (var message in chatRoom.UserMessages!)
				{
					if (!message.IsRead)
					{
						return new GetChatRoomsListQueryResult(chatRoomList, true);
					}
				}
			}
		}

		return new GetChatRoomsListQueryResult(chatRoomList, false);
	}
}
