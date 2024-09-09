using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostIdListForRealtor;

public class GetPostIdListForRealtorQueryHandler(
	IUserRepository userRepository, IPostRepository postRepository)
	: IRequestHandler<GetPostIdListForRealtorQuery, ErrorOr<List<Guid>?>>
{
	public async Task<ErrorOr<List<Guid>?>> Handle(
		GetPostIdListForRealtorQuery request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		var user = userOrError.Value;

		//Get list Of id
		return await postRepository.GetListOfPostIdForRealtor(request.UserId);
	}
}
