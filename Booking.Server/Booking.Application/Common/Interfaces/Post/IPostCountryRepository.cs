using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostCountryRepository
{
    Task<List<PostCountry>?> GetCountriesListAsync();

    Task<List<PostCountry>?> GetCountriesFilteredListAsync(Guid? Category, Guid? City, Guid? Realtor);

    Task<PostCountry?> GetPostCountryByIdAsync(Guid id);
}
