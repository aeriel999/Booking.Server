using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Posts.GetCities;
using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetCitiesFilteredList;
public class GetCitiesFilteredListQueryHandler(IPostCityRepository postCityRepository)
    : IRequestHandler<GetCitiesFilteredListQuery, List<PostCity>?>
{
    public async Task<List<PostCity>?> Handle(
        GetCitiesFilteredListQuery request, CancellationToken cancellationToken)
    {
        return await postCityRepository.GetCitiesFilteredListAsync(request.Category, request.Country, request.Realtor);
    }
}

