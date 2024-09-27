using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfPostsForModeration;

public class GetListOfPostsForModerationQueryHandler(
	IUserRepository userRepository, IPostRepository postRepository)
	: IRequestHandler<GetListOfPostsForModerationQuery, ErrorOr<PagedList<Post>?>>
{
	public async Task<ErrorOr<PagedList<Post>?>> Handle(
		GetListOfPostsForModerationQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Compare user rele
		if (request.Role.ToLower() != Roles.Admin.ToLower())
			return Error.Conflict("Permission deny");

		//get list of posts
		var postList = await postRepository.GetPostListForModeration();

		//Get part of list
		var list = PagedList<Post>.getPagedList(postList, request.Page, request.SizeOfPage);

		//Sort list 
		if (list != null)
			list.items = list.items!.OrderBy(item => item.PostAt).ToList();

		return list;
	}
}
