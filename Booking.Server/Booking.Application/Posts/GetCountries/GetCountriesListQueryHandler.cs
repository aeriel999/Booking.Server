using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCountries;

public class GetCountriesListQueryHandler(IPostCountryRepository postCountryRepository)
	: IRequestHandler<GetCountriesListQuery, ErrorOr<List<PostCountry>>>
{
	public async Task<ErrorOr<List<PostCountry>>> Handle(
		GetCountriesListQuery request, CancellationToken cancellationToken)
	{
		var countryList = await postCountryRepository.GetCountriesListAsync();

		if (countryList == null) 
			return Error.NotFound("Error in loading of countries");

		return countryList;
	}
}
