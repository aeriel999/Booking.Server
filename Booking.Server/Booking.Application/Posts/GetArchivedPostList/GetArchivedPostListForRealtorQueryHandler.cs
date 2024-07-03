using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetArchivedPostList;

public class GetArchivedPostListForRealtorQueryHandler(IPostRepository postRepository)
	: IRequestHandler<GetArchivedPostListForRealtorQuery, PagedList<Post>?>
{
	public async Task<PagedList<Post>?> Handle(
		GetArchivedPostListForRealtorQuery request, CancellationToken cancellationToken)
	{
		//Get list of archived posts
		var posts = await postRepository.GetArchivedListPostByRealtorIdAsync(request.UserId);

		//Get part of list
		var list = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

		//Sort list 
		if(list != null)
			list.items = list.items!.OrderBy(item => item.PostAt).ToList();

		return list;
	}
}
