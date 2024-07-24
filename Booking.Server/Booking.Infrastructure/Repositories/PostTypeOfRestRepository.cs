using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class PostTypeOfRestRepository(BookingDbContext context) : IPostTypeOfRestRepository
{
	private readonly DbSet<PostTypeOfRest> _dbSet = context.Set<PostTypeOfRest>();
	 
	public async Task<List<PostTypeOfRest>> GetListTypeOfRentAsync()
	{
		return await _dbSet.ToListAsync();
	}

	public async Task<PostTypeOfRest?> GetTypeOfRentByIdAsync(Guid id)
	{
		return await _dbSet.FindAsync(id);
	}
}
