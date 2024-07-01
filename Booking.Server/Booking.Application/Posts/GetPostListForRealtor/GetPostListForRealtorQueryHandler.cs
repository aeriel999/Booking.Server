using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostListForRealtor;

public class GetPostListForRealtorQueryHandler(IPostRepository postRepository) 
	: IRequestHandler<GetPostListForRealtorQuery, ErrorOr<PagedList<Post>?>>
{
	public async Task<ErrorOr<PagedList<Post>?>> Handle(
		GetPostListForRealtorQuery request, CancellationToken cancellationToken)
	{
		//Get post list 
		var posts = await postRepository.GetPostListWithIncludesByRealtorIdAsync(request.UserId);

		//Get part of list
		var list = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

		return list;
	}
 
}
 
