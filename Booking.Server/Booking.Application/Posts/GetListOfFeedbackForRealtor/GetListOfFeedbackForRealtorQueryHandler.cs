using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfFeedbackForRealtor;

public class GetListOfFeedbackForRealtorQueryHandler(
	IUserRepository userRepository,
	IPostRepository postRepository,
	IPostFeedbackRepository postFeedbackRepository)
	: IRequestHandler<GetListOfFeedbackForRealtorQuery, ErrorOr<PagedList<Feedback>?>>
{
	public async Task<ErrorOr<PagedList<Feedback>?>> Handle(
		GetListOfFeedbackForRealtorQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Get list of posts
		var postList = await postRepository.GetListPostByRealtorIdAsync(request.UserId);

		//make feedbackList
		var feedbackList = new List<Feedback>();

		if (postList != null)
		{
			//Get feedbackList
			foreach (var post in postList)
			{
				var postFeedbackList = await postFeedbackRepository.GetFeedbacksWhithIncludesForPostIdAsync(post.Id);

				if (postFeedbackList == null) continue;

				feedbackList.AddRange(postFeedbackList);
			}
		}

		var orderList = feedbackList.OrderByDescending(f => f.FeedbackAt);

		//Get part of list
		var list = PagedList<Feedback>.getPagedList(orderList, request.Page, request.SizeOfPage);

		return list;
	}
}
