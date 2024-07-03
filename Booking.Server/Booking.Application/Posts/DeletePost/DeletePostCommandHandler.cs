using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.DeletePost;

public class DeletePostCommandHandler(IPostRepository postRepository)
	: IRequestHandler<DeletePostCommand, ErrorOr<Deleted>>
{
	public async Task<ErrorOr<Deleted>> Handle(DeletePostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostById(request.PostId);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Check for Realtor Id matching
		if (post.UserId != request.UserId)
			return Error.Validation("Access deny");

		//Delete post
		await postRepository.DeletePostAsync(post);
		await postRepository.SavePostAsync();

		return Result.Deleted;
	}
}

