using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class PostCityRepository(BookingDbContext context) : IPostCityRepository
{
	private readonly DbSet<PostCity> _dbSet = context.Set<PostCity>();

	public async Task CreateCityAsync(PostCity city)
	{
		await _dbSet.AddAsync(city);
	}

	public Task<PostCity?> FindCityByNameAndCountryIdAsync(string name, Guid countryId)
	{
		 return _dbSet.FirstOrDefaultAsync(c => c.CountryId == countryId 
		 && c.Name.ToLower() == name.ToLower());
	}

	public async Task<List<PostCity>?> GetCitiesListByCountryIdAsync(Guid countryId)
	{
		return await _dbSet
			.Where(c => c.CountryId == countryId)
			.ToListAsync();
	}

	public async Task SaveCityAsync()
	{
		await context.SaveChangesAsync();
	}


}
