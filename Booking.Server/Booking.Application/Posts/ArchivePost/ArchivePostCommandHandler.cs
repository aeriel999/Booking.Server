using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.ArchivePost;

public class ArchivePostCommandHandler(IPostRepository postRepository)
	: IRequestHandler<ArchivePostCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(ArchivePostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostById(request.PostId);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Check for Realtor Id matching
		if (post.UserId != request.UserId)
			return Error.Validation("Access deny");

		//Archived post
		post.IsArhive = true;

		await postRepository.UpdatePostAsync(post);

		await postRepository.SavePostAsync();

		return Result.Success;
	}
}
