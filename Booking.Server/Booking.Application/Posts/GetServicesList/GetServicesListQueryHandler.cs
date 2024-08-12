using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetServicesList;

public class GetServicesListQueryHandler(IServiceRepository serviceRepository)
	: IRequestHandler<GetServicesListQuery, ErrorOr<List<Service>>>
{
	public async Task<ErrorOr<List<Service>>> Handle(GetServicesListQuery request, CancellationToken cancellationToken)
	{
		var getServicesResult = await serviceRepository.GetListOfServisesAsync()

		if (getServicesResult == null)
			return Error.NotFound("Error in loading services list");

		return getServicesResult;
	}
}
