using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetArchivedPostList;

public class GetArchivedPostListForRealtorQueryHandler(IPostRepository postRepository)
	: IRequestHandler<GetArchivedPostListForRealtorQuery, PagedList<Post>>
{
	public async Task<PagedList<Post>> Handle(
		GetArchivedPostListForRealtorQuery request, CancellationToken cancellationToken)
	{
		var posts = await postRepository.GetArchivedListPostByRealtorIdAsync(request.UserId);

		var list = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

		list.items = list.items.OrderBy(item => item.PostAt).ToList();

		return list;
	}
}
