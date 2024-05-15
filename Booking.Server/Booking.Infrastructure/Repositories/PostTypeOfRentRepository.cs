using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class PostTypeOfRentRepository(BookingDbContext context) : IPostTypeOfRentRepository
{
	private readonly DbSet<PostTypeOfRent> _dbSet = context.Set<PostTypeOfRent>();
	 
	public async Task<List<PostTypeOfRent>> GetListTypeOfRentAsync()
	{
		return await _dbSet.ToListAsync();
	}

	public async Task<PostTypeOfRent?> GetTypeOfRentByIdAsync(Guid id)
	{
		return await _dbSet.FindAsync(id);
	}
}
