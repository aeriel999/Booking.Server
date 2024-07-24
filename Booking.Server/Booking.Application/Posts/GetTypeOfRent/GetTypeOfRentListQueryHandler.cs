using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetTypeOfRent;

public class GetTypeOfRentListQueryHandler(IPostTypeOfRestRepository postTypeOfRentRepository)
	: IRequestHandler<GetTypeOfRentListQuery, ErrorOr<List<PostTypeOfRent>>>
{
	public async Task<ErrorOr<List<PostTypeOfRent>>> Handle(
		GetTypeOfRentListQuery request, CancellationToken cancellationToken)
	{
		//var listOfTypes  = await postTypeOfRentRepository.GetListTypeOfRentAsync();

		//if (listOfTypes == null)
			return Error.NotFound("Error in loading of Types Of Rent");

		//return listOfTypes;
	}
}
