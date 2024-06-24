using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.ArchivePost;

public class ArchivePostCommandHandler(IPostRepository postRepository)
	: IRequestHandler<ArchivePostCommand, ErrorOr<Post>>
{
	public async Task<ErrorOr<Post>> Handle(ArchivePostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostByIdAsync(request.PostId);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Check for Realtor Id matching
		if (post.UserId != request.UserId)
			return Error.Validation("Access deny");

		//Archived post
		post.IsArhive = true;

		await postRepository.UpdatePostAsync(post);

		await postRepository.SavePostAsync();

		return post;
	}
}
