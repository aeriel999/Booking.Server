using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostCityRepository
{
	Task<List<PostCity>?> GetCitiesListByCountryIdAsync(Guid countryId);

	Task CreateCityAsync(PostCity city);

	Task SaveCityAsync();

	Task<PostCity?> FindCityByNameAndCountryIdAsync(string name, Guid countryId);

	Task<PostCity?> GetCityByIdAsync(Guid? cityId);
}
