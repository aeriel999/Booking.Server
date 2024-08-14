using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using MediatR;


namespace Booking.Application.Posts.GetCities;

public class GetCitiesListByCountryIdQueryHandler(IPostCityRepository postCityRepository)
	: IRequestHandler<GetCitiesListByCountryIdQuery, List<PostCity>?>
{
	public async Task<List<PostCity>?> Handle(
		GetCitiesListByCountryIdQuery request, CancellationToken cancellationToken)
    {
		return await postCityRepository.GetCitiesListByCountryIdAsync(request.Country);
	}
}
