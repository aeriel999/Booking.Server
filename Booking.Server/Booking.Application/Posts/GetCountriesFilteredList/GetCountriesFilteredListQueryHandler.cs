using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Posts.GetCountriesFilteredList;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCountries;

public class GetCountriesFilteredListQueryHandler(IPostCountryRepository postCountryRepository)
    : IRequestHandler<GetCountriesFilteredListQuery, ErrorOr<List<PostCountry>>>
{
    public async Task<ErrorOr<List<PostCountry>>> Handle(
        GetCountriesFilteredListQuery request, CancellationToken cancellationToken)
    {
        var countryList = await postCountryRepository.GetCountriesFilteredListAsync(request.Category, request.Realtor);

        if (countryList == null)
            return Error.NotFound("Error in loading of countries");

        return countryList;
    }
}
