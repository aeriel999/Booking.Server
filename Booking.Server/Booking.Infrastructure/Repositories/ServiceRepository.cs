using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class ServiceRepository(BookingDbContext context) : IServiceRepository
{
	private readonly DbSet<Service> _dbSet = context.Set<Service>();

	public async Task<List<Service>> GetListOfServisesAsync()
	{
		return await _dbSet.ToListAsync();
	}
}
