using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetNumberOfUnleastMessages;

public class GetNumberOfUnleastMessagesQueryHandler(
	IUserRepository userRepository, IChatRoomRepository chatRoomRepository)
	: IRequestHandler<GetNumberOfUnleastMessagesQuery, ErrorOr<int>>
{
	public async Task<ErrorOr<int>> Handle(GetNumberOfUnleastMessagesQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Get chatRoom list
		var chatRoomList = await chatRoomRepository.GetChatRoomListByRealtorIdAsync(request.UserId);

		var numberOfUnleastMessages = 3;

		if (chatRoomList != null)
		{
			foreach (var chatRoom in chatRoomList)
			{
				numberOfUnleastMessages += chatRoom.NumberOfUnreadMessages;
			}
		}

		return numberOfUnleastMessages;
	}
}
