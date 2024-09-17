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
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound();

		//Find chatroom
		var room = await chatRoomRepository.GetChatRoomByIdAsync(request.RoomId);

		if (room == null) return Error.NotFound();

		//update NumberOfUnreadMessages
	//	room.NumberOfUnreadMessages += 1;

		await chatRoomRepository.UpdateChatRoomAsync(room);

		await chatRoomRepository.SaveChatRoomAsync();

		//Create and save new message
		var userMessage = new UserMessage
		{
			Id = Guid.NewGuid(),
			UserId = request.UserId,
			Message = request.Message,
			ChatRoomId = request.RoomId,
			SentAt = DateTime.Now.ToUniversalTime(),
			IsRead = false,
		};

		await userMessageRepository.CreateUserMessageAsync(userMessage);

		await userMessageRepository.SaveUserMessageAsync();

		return userMessage.Message;
	}
}
