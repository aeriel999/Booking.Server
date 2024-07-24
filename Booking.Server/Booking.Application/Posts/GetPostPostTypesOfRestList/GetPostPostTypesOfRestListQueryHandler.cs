using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostPostTypesOfRestList;

public class GetPostPostTypesOfRestListQueryHandler(
	IPostPostTypeOfRestRepository postPostTypeOfRestRepository)
	: IRequestHandler<GetPostPostTypesOfRestListQuery, ErrorOr<List<PostPostTypeOfRest>>>
{
	public async Task<ErrorOr<List<PostPostTypeOfRest>>> Handle(GetPostPostTypesOfRestListQuery request, CancellationToken cancellationToken)
	{
		var getPostTypeOfRestResult = await postPostTypeOfRestRepository.GetListPostPostTypeOfRestAsync();

		if (getPostTypeOfRestResult == null)
			return Error.NotFound("Error in loading categories list");

		return getPostTypeOfRestResult;
	}
}
