using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CreateMessage;

public class CreateMessageCommandHandler(
	IUserRepository userRepository, 
	IUserMessageRepository userMessageRepository,
	IChatRoomRepository chatRoomRepository)
	: IRequestHandler<CreateMessageCommand, ErrorOr<string>>
{
	public async Task<ErrorOr<string>> Handle(
		CreateMessageCommand request, CancellationToken cancellationToken)
	{
		//Find User
		var userOrError = await userRepository.FindByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound();

		var user = userOrError.Value;

		//Get UserName
		var userName = await userRepository.GetUserNameByUserAsync(user);

		var room = await chatRoomRepository.GetChatRoomByIdAsync(request.RoomId);

		//ToDo UpdateChatRoom
		//Create and save new message
		var userMessage = new UserMessage
		{
			Id = Guid.NewGuid(),
			UserId = Guid.Parse(request.UserId),
			Message = request.Message,
			ChatRoomId = request.RoomId,
			ChatRoom = room!,
			SentAt = DateTime.Now.ToUniversalTime(),
			IsRead = false,
		};

		await userMessageRepository.CreateUserMessageAsync(userMessage);

		await userMessageRepository.SaveUserMessageAsync();

		return userMessage.Message;
	}
}
