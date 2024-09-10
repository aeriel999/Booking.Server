using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatIdList;

public class GetChatIdListQueryHandler(
	IUserRepository userRepository, IChatRoomRepository chatRoomRepository)
	: IRequestHandler<GetChatIdListQuery, ErrorOr<List<Guid>?>>
{
	public async Task<ErrorOr<List<Guid>?>> Handle(
		GetChatIdListQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//get list for realtor
		if (request.Role == Roles.Realtor)
		{
			return await chatRoomRepository.GetChatRoomIdListByRealtorIdAsync(request.UserId);
		}

		//Get list for user
		if (request.Role == Roles.User)
		{
			return await chatRoomRepository.GetChatRoomIdListByUserIdAsync(request.UserId);
		}

		return Error.Validation("Something went wrong/ try again");
	}
}
