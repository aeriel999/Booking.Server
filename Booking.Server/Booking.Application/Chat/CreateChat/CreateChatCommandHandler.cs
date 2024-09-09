using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CreateChat;

public class CreateChatCommandHandler(
	IChatRegystryService chatRegystryService,
	IUserRepository userRepository,
	IPostRepository postRepositories,
	IChatRoomRepository chatRoomRepositories)
	: IRequestHandler<CreateChatCommand, ErrorOr<Guid>>
{
	public async Task<ErrorOr<Guid>> Handle(
		CreateChatCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return userOrError.Errors;

		//Get Post
		var post = await postRepositories.GetPostByIdAsync(request.PostId);

		if (post == null)
			return Error.NotFound("Post is not found");

		//Check chatRoom for existing
		var chatRoom = await chatRoomRepositories.GetChatRoomByPostIdAndUserIdAsync(
			request.UserId, request.PostId);

		if (chatRoom != null) return chatRoom.ChatRoomId;

		else
		{
			//Create chatRoom
			var newChatRoom = new ChatRoom
			{
				ChatRoomId = Guid.NewGuid(),
				ClientId = request.UserId,
				RealtorId = post.UserId,
				PostId = request.PostId,
				PostName = post.Name,
				NumberOfUnreadMessages = 0
			};

			await chatRoomRepositories.CreateChatRoomAsync(newChatRoom);

			await chatRoomRepositories.SaveChatRoomAsync();

			//register chatroom
			chatRegystryService.CreateRoom(newChatRoom.ChatRoomId);

			return newChatRoom.ChatRoomId;
		}
	
	}
}
