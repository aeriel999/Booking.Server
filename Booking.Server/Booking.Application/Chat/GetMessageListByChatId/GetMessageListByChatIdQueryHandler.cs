using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetMessageListByChatId;

public class GetMessageListByChatIdQueryHandler(IUserRepository userRepository, IUserMessageRepository userMessageRepository)
	: IRequestHandler<GetMessageListByChatIdQuery, ErrorOr<List<UserMessage>?>>
{
	public async Task<ErrorOr<List<UserMessage>?>> Handle(
		GetMessageListByChatIdQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Make and return list of Messages
		return await userMessageRepository.GetUserMessagesByChatRoomIdAsync(request.ChatRoomId);
	}
}
