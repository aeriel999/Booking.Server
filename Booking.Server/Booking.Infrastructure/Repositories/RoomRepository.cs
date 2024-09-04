using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Booking.Infrastructure.Repositories;

public class RoomRepository(BookingDbContext context) : IRoomRepository
{
	private readonly DbSet<Room> _dbSet = context.Set<Room>();

	public async Task CreateRoomAsync(Room room)
	{
		await _dbSet.AddAsync(room);

		await context.SaveChangesAsync();
	}


	public async Task DeleteRoomListAsync(List<Room> rooms)
	{
		_dbSet.RemoveRange(rooms);

		await context.SaveChangesAsync();	
	}


	public async Task<ErrorOr<Room>> GetRoomByIdAsync(Guid roomId)
	{
		var roomOrError = await _dbSet.Where(r => r.Id == roomId)
										.FirstOrDefaultAsync();

		if (roomOrError == null) 
			return Error.NotFound();

		return roomOrError!;
	}


	public ErrorOr<Room> GetRoomById(Guid roomId)
	{
		var roomOrError = _dbSet.Where(r => r.Id == roomId)
										.FirstOrDefault();

		if (roomOrError == null)
			return Error.NotFound();

		return roomOrError!;
	}


	public async Task<Room> UpdateRoomAsync(Room room)
	{
		await Task.Run
			(() =>
			{
				_dbSet.Attach(room);
				context.Entry(room).State = EntityState.Modified;
			});

		await context.SaveChangesAsync();

		return room;
	}
}
