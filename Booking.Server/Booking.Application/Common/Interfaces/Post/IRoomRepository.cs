using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IRoomRepository
{
	Task CreateRoomAsync(Room room);
}
