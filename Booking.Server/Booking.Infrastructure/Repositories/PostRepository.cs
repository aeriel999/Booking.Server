using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.IO;

namespace Booking.Infrastructure.Repositories;

public class PostRepository(BookingDbContext context) : IPostRepository
{
	private readonly DbSet<Post> _dbSet = context.Set<Post>();

	public async Task CreatePostAsync(Post post)
	{
		await _dbSet.AddAsync(post);
	}

	public async Task SavePostAsync()
	{
		await context.SaveChangesAsync();
	}

	public async Task<Post?> GetPostWithIncludesByIdAsync(Guid id)
	{
		return await _dbSet.Where(post => post.Id == id)
							.Include(post => post.PostTypeOfRent)
							.Include(post => post.Category)
							.Include(post => post.Street!.City!.Country)
							.Include(post => post.User)
							.Include(post => post.ImagesPost)
							.FirstOrDefaultAsync();
	}

	public async Task<PagedList<Post>> GetAllAsync(int page, int sizeOfPage)
	{
		var posts = await GetIncludeListNotArchivedAsync();

		var list = PagedList<Post>.getPagedList(posts, page, sizeOfPage);

		list.items = list.items.OrderBy(item => item.PostAt).ToList();

		return list;
	}

	public async Task<List<Post>> Filter(Guid? category, Guid? country, Guid? city, Guid? realtor)
	{
		var posts = await GetIncludeListNotArchivedAsync();

		return posts.Where(p => (category == null ? true : p.CategoryId == category)
			 && (country == null ? true : p.Street!.City!.CountryId == country)
			 && (city == null ? true : p.Street!.CityId == city)
			 && (realtor == null ? true : p.UserId == realtor))
			.Select(p => p)
			.ToList();
	}

	public async Task<PagedList<Post>> GetFilteredListAsync(
		Guid? category, Guid? country, Guid? city, Guid? realtor, int page, int sizeOfPage)
	{
		var posts = await Filter(category, country, city, realtor);

		PagedList<Post> list = new PagedList<Post>();

        list = PagedList<Post>.getPagedList(posts.
             OrderByDescending(item => item.PostAt).
             Select(p=>p), page, sizeOfPage);
        
        return list;
    }
   public async Task<PagedList<Post>> GetPostByNameAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, string name, int page, int sizeOfPage)
    {
        var posts = await Filter(category, country, city, realtor);

		var list = PagedList<Post>.getPagedList(posts
			.Where(p => p.Name.ToLower().Equals(name.ToLower()))
			.Select(p => p).
			ToList(), page, sizeOfPage);

		return list;
	}

	public async Task<List<string>> GetNameOfPostAsync(
		Guid? category, Guid? country, Guid? city, Guid? realtor, string name)
	{
		if (String.IsNullOrEmpty(name)) return new List<string>();

		var posts = await Filter(category, country, city, realtor);

		Regex regex = new Regex($@"(^|\s){name.ToLower()}");

		var list = posts
			.Where(p => regex.IsMatch(p.Name.ToLower()))
			.Select(p => p.Name)
			.Distinct() // видалення копій в списку
			.Take(10)
			.ToList();

		return list;
	}

	public async Task<List<Post>> GetIncludeListAsync()
	{
		return await _dbSet
			.Include(post => post.PostTypeOfRent)
			.Include(post => post.Category)
			.Include(post => post.Street!.City!.Country)
			.Include(post => post.User)
			.Include(post => post.ImagesPost)
			.ToListAsync();
	}
    public async Task<List<Post>> GetIncludeListNotArchivedAsync()
    {
        return await _dbSet
			.Where(post => !post.IsActive)
            .Include(post => post.PostTypeOfRent)
            .Include(post => post.Category)
            .Include(post => post.Street!.City!.Country)
            .Include(post => post.User)
            .Include(post => post.ImagesPost)
            .ToListAsync();
    }
    public async Task<List<Post>> GetPostListWithIncludesByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.UserId == realtorId)
			.Include(post => post.PostTypeOfRent)
			.Include(post => post.Category)
			.Include(post => post.Street!.City!.Country)
			.ToListAsync();
	}

	public async Task<List<Post>?> GetListPostByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.UserId == realtorId)
			.Include(post=>post.ImagesPost)
			.ToListAsync();
	}

	public async Task UpdatePostAsync(Post post)
	{
		await Task.Run
			(() =>
			{
				_dbSet.Attach(post);
				context.Entry(post).State = EntityState.Modified;
			});
	}

	public async Task<List<Post>?> GetArchivedListPostByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.UserId == realtorId && c.IsArhive == true)
			.Include(post => post.PostTypeOfRent)
			.Include(post => post.Category)
			.Include(post => post.Street!.City!.Country)
			.ToListAsync();
	}

	public async Task DeletePostAsync(Post post)
	{
		await Task.Run
			(() =>
			{
				_dbSet.Remove(post);
			});

		await context.SaveChangesAsync();
	}

	public async Task<Post?> GetPostById(Guid postId)
	{
		return await _dbSet.Where(p => p.Id == postId).FirstOrDefaultAsync();
	}
}