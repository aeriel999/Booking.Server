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
			chatRoomList = await chatRoomRepository.GetChatRoomListWithPostsByRealtorIdAsync(
				request.UserId);

		if (request.UserRole == Roles.User)
			chatRoomList = await chatRoomRepository.GetChatRoomListWithPostByUserIdAsync(
				request.UserId);

		var postChatRooms = new List<PostChatRoomInfo>();

		var chatList = new List<ChatRoomInfo>();

		foreach (ChatRoom chatRoom in chatRoomList)
		{
			
		}

		return Error.NotFound();
	}
}
