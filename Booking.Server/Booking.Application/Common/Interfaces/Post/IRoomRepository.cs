using Booking.Domain.Posts;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Post;

public interface IRoomRepository
{
	Task CreateRoomAsync(Room room);


	Task DeleteRoomListAsync(List<Room> room);


	Task<ErrorOr<Room>> GetRoomByIdAsync(Guid roomId);


	ErrorOr<Room> GetRoomById(Guid roomId);
}
