using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace Booking.Infrastructure.Repositories;

public class PostStreetRepository(BookingDbContext context) : IPostStreetRepository
{
	private readonly DbSet<PostStreet> _dbSet = context.Set<PostStreet>();

	public async Task CreateStreetAsync(PostStreet street)
	{
		await _dbSet.AddAsync(street);
	}

	public Task<PostStreet?> FindStreetByNameAndCityIdAsync(string streetName, Guid cityId)
	{
		return _dbSet.FirstOrDefaultAsync(c => c.CityId == cityId
		&& c.Name.ToLower() == streetName.ToLower());
	}

	public async Task<PostStreet?> GetStreetByIdAsync(Guid? streetId)
	{
		return await _dbSet.FindAsync(streetId);
	}

	public async Task<List<PostStreet>?> GetStreetListByCityIdAsync(Guid cityId)
	{
		return await _dbSet
			.Where(c => c.CityId == cityId)
			.ToListAsync();
	}

	public async Task SaveStreetAsync()
	{
		await context.SaveChangesAsync();
	}
}
