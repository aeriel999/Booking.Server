using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostTypeOfRestRepository
{
    Task<List<PostTypeOfRest>> GetAsync();


	Task<List<PostTypeOfRest>> GetListTypeOfRestAsync(); 


	Task<PostTypeOfRest?> GetTypeOfRestByIdAsync(Guid id);
}

