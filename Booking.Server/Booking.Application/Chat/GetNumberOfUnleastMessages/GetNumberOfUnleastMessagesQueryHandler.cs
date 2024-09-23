using Booking.Application.Common.Interfaces.Chat;
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

		//Get number of unread msg
		return await chatRoomRepository.GetNumberOfUnreadMessagesAsync(request.UserId);
	}
}
