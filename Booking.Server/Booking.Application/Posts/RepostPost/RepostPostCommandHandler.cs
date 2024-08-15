using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.RepostPost;

public class RepostPostCommandHandler(IPostRepository postRepository) 
	: IRequestHandler<RepostPostCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(RepostPostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostByIdAsync(request.PostId);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Check for Realtor Id matching
		if (post.UserId != request.UserId)
			return Error.Validation("Access deny");

		//Repost post
		post.IsArhive = false;

		await postRepository.UpdatePostAsync(post);

		await postRepository.SavePostAsync();

		return Result.Success;
	}
}
