using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;

public class GetListOfChatsByPostInfoForRealtorQueryHandler(
	IUserRepository userRepository, IPostRepository postRepository, IChatRoomRepository chatRoomRepository)
	: IRequestHandler<GetListOfChatsByPostInfoForRealtorQuery, ErrorOr<List<ChatRoom>>>
{
	public async Task<ErrorOr<List<ChatRoom>>> Handle(GetListOfChatsByPostInfoForRealtorQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//get post
		var post = await postRepository.GetPostByIdAsync(request.PostId);

		if (post == null)
			return Error.NotFound("Post is not found");

		if (post.UserId != userOrError.Value.Id)
			return Error.Validation("Access deny");

		return (await chatRoomRepository.GetChatRoomListByPostId(request.PostId))!;
	}
}
