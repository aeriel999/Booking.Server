using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.ActivatePost;

public class ActivatePostCommandHandler(
	IUserRepository userRepository, IPostRepository postRepository) : IRequestHandler<ActivatePostCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(ActivatePostCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Get Post
		var post = await postRepository.GetPostByIdAsync(request.PostId);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Compare user role
		if (request.Role.ToLower() != Roles.Admin.ToLower())
			return Error.Validation("Access deny");

		post.IsActive = true;

		await postRepository.UpdatePostAsync(post);

		await postRepository.SavePostAsync();

		return Result.Success;
	}
}
