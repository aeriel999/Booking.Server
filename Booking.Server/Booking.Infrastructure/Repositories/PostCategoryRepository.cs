using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Booking.Infrastructure.Repositories;

public class PostCategoryRepository(BookingDbContext context) : IPostCategoryRepository
{
	private readonly DbSet<PostCategory> _dbSet = context.Set<PostCategory>();

	public async Task<PostCategory?> FindPostCategoryByIdAsync(Guid postCategoryId)
	{
		return await _dbSet.FindAsync(postCategoryId);
	}

    public async Task<List<PostCategory>?> GetListOfCategoriesAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<List<PostCategory>?> GetFilteredListOfCategoriesAsync(Guid? Country, Guid? City, Guid? Realtor)
	{
		return await _dbSet.
			Include(c => c.Posts!)
			.ThenInclude(post => post.Street!.City!.Country)
			.Where(category =>
            category.Posts != null
            && (Country==null ? true : category.Posts.Any(post => post.Street != null && post.Street.City != null && post.Street.City.CountryId == Country && post.IsActive == true && post.IsArhive == false))
			&& (City == null ? true : category.Posts.Any(post => post.Street != null && post.Street.CityId == City && post.IsActive == true && post.IsArhive == false))
            && (Realtor == null ? true : category.Posts.Any(p => p.UserId == Realtor && p.IsActive == true && p.IsArhive == false))).
        ToListAsync();
	}
}
/*
 return await _dbSet.
			Include(c => c.Posts!)
			.ThenInclude(post => post.Street!.City!.Country)
			.Where(category => 
			(Country==null ? true : category.Posts!.Any(post => post.Street!.City!.CountryId == Country))
			&& (City == null ? true : category.Posts!.Any(post => post.Street!.CityId == City))
            && (Realtor == null ? true : category.Posts!.Any(p => p.UserId == Realtor))).
			ToListAsync();
 */