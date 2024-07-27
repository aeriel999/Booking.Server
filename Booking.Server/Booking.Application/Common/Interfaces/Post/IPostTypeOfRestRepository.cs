using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostTypeOfRestRepository
{
    Task<List<PostTypeOfRest>> GetAsync();
}

