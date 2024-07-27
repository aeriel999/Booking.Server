using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class PostTypeOfRestRepository(BookingDbContext context) : IPostTypeOfRestRepository
{
    private readonly DbSet<PostTypeOfRest> _dbSet = context.Set<PostTypeOfRest>();

	public async Task<List<PostTypeOfRest>> GetAsync()
	{
		return await _dbSet
			.Include(p => p.PostPostTypesOfRest!)
			.ThenInclude(p => p.Post!.ImagesPost)
			.ToListAsync();
	}

	public async Task<List<PostTypeOfRest>> GetListTypeOfRestAsync()
	{
		return await _dbSet.ToListAsync();
	}

	public async Task<PostTypeOfRest?> GetTypeOfRestByIdAsync(Guid id)
    {
		return await _dbSet.FindAsync(id);
    }
}

