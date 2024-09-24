using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.DeleteChat;

public class DeleteChatByIdCommandHandler(IUserRepository userRepository, IChatRoomRepository chatRoomRepository)
	: IRequestHandler<DeleteChatByIdCommand, ErrorOr<Deleted>>
{
	public async Task<ErrorOr<Deleted>> Handle(DeleteChatByIdCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Get chat room
		var chatRoom = await chatRoomRepository.GetChatRoomByIdAsync(request.ChatroomId);

		if (chatRoom == null)
			return Error.NotFound("Chat Room is not found");

		//delete chat room
		await chatRoomRepository.DeleteChatRoomAsync(chatRoom);
		await chatRoomRepository.SaveChatRoomAsync();
		 
		return Result.Deleted;
	}
}
