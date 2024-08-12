using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IServiceRepository
{
	Task<List<Service>> GetListOfServisesAsync();
}
