using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class RoomRepository(BookingDbContext context) : IRoomRepository
{
	private readonly DbSet<Room> _dbSet = context.Set<Room>();

	public async Task CreateRoomAsync(Room room)
	{
		await _dbSet.AddAsync(room);

		await context.SaveChangesAsync();
	}
}
