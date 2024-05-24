using Ardalis.Specification.EntityFrameworkCore;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class PostCountryRepository(BookingDbContext context) : IPostCountryRepository
{
	private readonly DbSet<PostCountry> _dbSet = context.Set<PostCountry>();

	public async Task<List<PostCountry>?> GetCountriesListAsync()
    {
        return await _dbSet.ToListAsync();
    }

	public async Task<PostCountry?> GetPostCountryByIdAsync(Guid countryId)
	{
		return await _dbSet.FindAsync(countryId); 
	}
}
