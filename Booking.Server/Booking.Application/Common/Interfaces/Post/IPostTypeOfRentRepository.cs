using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostTypeOfRentRepository
{
	Task<List<PostTypeOfRent>> GetListTypeOfRentAsync(); 


	Task<PostTypeOfRent?> GetTypeOfRentByIdAsync(Guid id);
}
