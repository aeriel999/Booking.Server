using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostCountryRepository
{
    Task<List<PostCountry>?> GetCountriesListAsync();


    Task<PostCountry?> GetPostCountryByIdAsync(Guid id);
}
