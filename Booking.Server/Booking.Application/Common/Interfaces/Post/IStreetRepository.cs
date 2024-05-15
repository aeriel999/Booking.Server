using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IStreetRepository 
{
    Task<PostStreet?> GetStreetByIdAsync(Guid streetId);

    Task<List<PostStreet>?> GetStreetListByCityIdAsync(Guid cityId);
}
