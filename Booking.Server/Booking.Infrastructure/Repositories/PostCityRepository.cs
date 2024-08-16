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
		//ToDo Nazar
		return await _dbSet
			.Where(c => c.CountryId == countryId)
			.ToListAsync();
	}

    public async Task<List<PostCity>?> GetCitiesFilteredListAsync(Guid? Category,Guid? Country, Guid? Realtor)
    {
        if (Country == null) return new();

        return await _dbSet
            .Include(s => s.Streets)
            .ThenInclude(p => p.Posts)
            .Where(c => (c.CountryId == Country) && (Category == null ? true :
              c.Streets!.Any(street =>
                   street.Posts!.Any(post =>
                          post.CategoryId == Category)))
            && (Realtor == null ? true :
              c.Streets!.Any(street =>
                   street.Posts!.Any(post =>
                         post.UserId == Realtor))))
            .ToListAsync();
    }

    public async Task<PostCity?> GetCityByIdAsync(Guid? cityId)
	{
		return await _dbSet.FindAsync(cityId);
	}

	public async Task SaveCityAsync()
	{
		await context.SaveChangesAsync();
	}


}
