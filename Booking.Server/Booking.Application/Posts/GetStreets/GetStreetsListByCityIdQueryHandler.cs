using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetStreets;

public class GetStreetsListByCityIdQueryHandler(IStreetRepository streetRepository)
	: IRequestHandler<GetStreetsListByCityIdQuery, List<PostStreet>?>
{
	public async Task<List<PostStreet>?> Handle(
		GetStreetsListByCityIdQuery request, CancellationToken cancellationToken)
	{
		return await streetRepository.GetStreetListByCityIdAsync(request.CityId);
	}
}
