using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostTypeOfRestRepository
{
    Task<List<PostTypeOfRest>> GetAsync();
	Task<List<PostTypeOfRest>> GetListTypeOfRentAsync(); 


	Task<PostTypeOfRest?> GetTypeOfRentByIdAsync(Guid id);
}

