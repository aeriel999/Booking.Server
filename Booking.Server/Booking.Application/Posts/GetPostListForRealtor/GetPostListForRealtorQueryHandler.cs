using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostListForRealtor;

public class GetPostListForRealtorQueryHandler(IPostRepository postRepository) 
	: IRequestHandler<GetPostListForRealtorQuery, ErrorOr<PagedList<GetPostListForRealtorQueryResult>>>
{
	public async Task<ErrorOr<PagedList<GetPostListForRealtorQueryResult>>> Handle(
		GetPostListForRealtorQuery request, CancellationToken cancellationToken)
	{
		var posts = await postRepository.GetPostListWithIncludesByRealtorIdAsync(request.UserId);

		List<GetPostListForRealtorQueryResult> getPostListForRealtorQueryResult = new();

		foreach (var post in posts)
		{
			var postForRealtor = new GetPostListForRealtorQueryResult(
				post.Id, post.Category!.Name, post.PostTypeOfRent!.Name, 
				post.Street!.City!.Country!.Name + " " + post.Street.City.Name + " " + post.Street.Name,
				post.Name, post.Price, post.PostAt, post.EditAt, post.IsActive, post.IsArhive);

			getPostListForRealtorQueryResult.Add(postForRealtor);
		}

		var list = PagedList<GetPostListForRealtorQueryResult>.getPagedList(
			getPostListForRealtorQueryResult, request.Page, request.SizeOfPage);

		list.items = list.items.OrderBy(item => item.DateOfPost).ToList();

		return list;
	}
 
}
 
