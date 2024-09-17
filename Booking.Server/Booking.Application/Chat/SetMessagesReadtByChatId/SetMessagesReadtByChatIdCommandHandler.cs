using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.SetMessagesReadtByChatId;

public class SetMessagesReadtByChatIdCommandHandler(
	IUserRepository userRepository, IChatRoomRepository chatRoomRepository, IUserMessageRepository userMessageRepository)
	: IRequestHandler<SetMessagesReadtByChatIdCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(SetMessagesReadtByChatIdCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//get list of unread messages
		var unreadMessagesList = await chatRoomRepository.GetListOfUnreadMessagesByChatIdAsync(request.ChatId);

		if (unreadMessagesList != null)
		{
			foreach (var unreadMsg in unreadMessagesList)
			{
				unreadMsg.IsRead = true;

				await userMessageRepository.UpdateMessageAsync(unreadMsg);
			}

			await userMessageRepository.SaveUserMessageAsync();
		}

		return Result.Success;
	}
}
