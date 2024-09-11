using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetListOfPostInfoForChatsForRealtor;

public class GetListOfPostInfoForChatsForRealtorQueryHandler(
	IUserRepository userRepository, IPostRepository postRepository)
	: IRequestHandler<GetListOfPostInfoForChatsForRealtorQuery, ErrorOr<List<Post>?>>
{
	public async Task<ErrorOr<List<Post>?>> Handle(
		GetListOfPostInfoForChatsForRealtorQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//get post list
		return await postRepository.GetListOfPostWithChatRooms(request.UserId);
	}
 
}
