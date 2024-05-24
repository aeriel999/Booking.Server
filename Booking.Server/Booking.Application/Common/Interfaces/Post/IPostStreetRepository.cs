using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostStreetRepository 
{
    Task<PostStreet?> GetStreetByIdAsync(Guid? streetId);

    Task<List<PostStreet>?> GetStreetListByCityIdAsync(Guid cityId);

    Task<PostStreet?> FindStreetByNameAndCityIdAsync(string streetName, Guid cityId);

    Task CreateStreetAsync(PostStreet street);

    Task SaveStreetAsync();
}
