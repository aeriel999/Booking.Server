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

    public async Task<List<PostCountry>?> GetCountriesFilteredListAsync(Guid? Category, Guid? City, Guid? Realtor)
    {
        return await _dbSet
            .Include(c=>c.Cities!)
            .ThenInclude(s => s.Streets!)
            .ThenInclude(p=> p.Posts)
            .Where(c => (c.Cities != null) && (Category == null? true : ( 
              c.Cities.Any(city => city.Streets!=null &&
              city.Streets!.Any(street => 
                   street.Posts != null && street.Posts!.Any(post => 
                          post.CategoryId==Category && post.IsActive == true && post.IsArhive == false)))))
            &&(City == null ? true :
            c.Cities.Any(city => city.Id == City && city.Streets != null && city.Streets.Any(s => s.Posts != null && s.Posts.Any(post => post.IsActive == true && post.IsArhive == false)))
            ) && (Realtor == null ? true :
            c.Cities!.Any(city =>
              city.Streets != null && city.Streets!.Any(street =>
                   street.Posts != null && street.Posts!.Any(post => 
                         post.UserId == Realtor && post.IsActive == true && post.IsArhive == false)))))
            .ToListAsync();
    }

	public async Task<PostCountry?> GetPostCountryByIdAsync(Guid countryId)
	{
		return await _dbSet.FindAsync(countryId); 
	}
}
