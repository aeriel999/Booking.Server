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
		var post = await postRepositories.GetPostWithIncludesByIdAsync(request.PostId);

		if (post == null)
			return Error.NotFound("Post is not found");

		//CreatePostPostTypeOfRestAsync chatRoom
		var chatRoom = new ChatRoom
		{
			ChatRoomId = Guid.NewGuid(),
			ClientId = request.UserId,
			RealtorId = request.UserId,
			PostId = request.PostId,
			PostName = post.Name
		};

		await chatRoomRepositories.CreateChatRoomAsync(chatRoom);

		await chatRoomRepositories.SaveChatRoomAsync();

		chatRegystryService.CreateRoom(chatRoom.ChatRoomId);

		return chatRoom.ChatRoomId;
	}
}
