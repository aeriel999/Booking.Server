using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class StreetRepository(BookingDbContext context) : IStreetRepository
{
	private readonly DbSet<PostStreet> _dbSet = context.Set<PostStreet>();

	public async Task<PostStreet?> GetStreetByIdAsync(Guid streetId)
	{
		return await _dbSet.FindAsync(streetId);
	}

	public async Task<List<PostStreet>?> GetStreetListByCityIdAsync(Guid cityId)
	{
		return await _dbSet
			.Where(c => c.CityId == cityId)
			.ToListAsync();
	}
}
