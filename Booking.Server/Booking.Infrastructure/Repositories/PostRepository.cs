using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using ErrorOr;

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
							.Include(post => post.Category)
							.Include(post => post.Street!.City!.Country)
							.Include(post => post.PostPostTypesOfRest!)
							.ThenInclude(post => post.PostTypeOfRest)
							.Include(post => post.Service!)
							.ThenInclude(post => post.Service)
							.Include(post => post.ReceivedFeedbacks)
							.Include(post => post.User)
							.Include(post => post.ImagesPost)
							.Include(post => post.Rooms)
							.FirstOrDefaultAsync();
	}


	public async Task<List<Post>> GetAllAsync()
	{
		var posts = await GetIncludeListNotArchivedAsync();

		return posts.Where(p => p.IsActive).OrderByDescending(item => item.PostAt).ToList();
	}


	public async Task<List<Post>> Filter(Guid? category, Guid? country, Guid? city, Guid? realtor)
	{
		var posts = await GetIncludeListNotArchivedAsync();

		return posts.Where(p => (category == null ? true : p.CategoryId == category)
			 && (country == null ? true : p.Street!.City!.CountryId == country)
			 && (city == null ? true : p.Street!.CityId == city)
			 && (realtor == null ? true : p.UserId == realtor)
			 && p.IsActive)
			.ToList();
	}


	public async Task<List<Post>> GetFilteredListAsync(
		Guid? category, Guid? country, Guid? city, Guid? realtor)
	{
		var posts = await Filter(category, country, city, realtor);

        return posts.OrderByDescending(item => item.PostAt).ToList();
    }


   public async Task<List<Post>> GetPostByNameAsync(
	   Guid? category, Guid? country, Guid? city, Guid? realtor, string name)
    {
        var posts = await Filter(category, country, city, realtor);

		return posts.Where(p => p.Name.ToLower().Equals(name.ToLower()))
			        .ToList();
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
			.Include(post => post.Category)
			.Include(post => post.Street!.City!.Country)
			.Include(post => post.User)
			.Include(post => post.ImagesPost)
			.Include(post => post.Rooms)
			.ToListAsync();
	}


    public async Task<List<Post>> GetIncludeListNotArchivedAsync()
    {
        return await _dbSet
			.Where(post => !post.IsArhive)
            .Include(post => post.Category)
            .Include(post => post.Street!.City!.Country)
            .Include(post => post.User)
            .Include(post => post.ImagesPost)
			.Include(post => post.Rooms)
			.Include(post => post.PostPostTypesOfRest!)
			.ThenInclude(post => post.PostTypeOfRest)
			.Include(post => post.ReceivedFeedbacks)
			.ToListAsync();
    }


    public async Task<List<Post>> GetPostListWithIncludesByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.UserId == realtorId)
			.Include(post => post.Category)
			.Include(post => post.Street!.City!.Country)
			//.Include(post => post.Rooms)
			.OrderByDescending(post => post.PostAt)
			.ToListAsync();
	}


	public async Task<List<Post>?> GetListPostByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.UserId == realtorId)
			.Include(post => post.ImagesPost)
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
			.Include(post => post.Category)
			.Include(post => post.Street!.City!.Country)
			.Include(post => post.Rooms)
			.ToListAsync();
	}


	public async Task DeletePostAsync(Post post)
	{
		await Task.Run
			(() =>
			{
				_dbSet.Remove(post);
			});

		//await context.SaveChangesAsync();
	}


	public async Task<Post?> GetPostByIdAsync(Guid postId)
	{
		return await _dbSet.Where(p => p.Id == postId)
			//.Include(post => post.ImagesPost)
			.FirstOrDefaultAsync();
	}


	public async Task<List<Post>> GetListOfPostWithMostRatingAsync()
	{
		var posts = await GetIncludeListNotArchivedAsync();

		return posts.OrderByDescending(p => p.Rate).Take(4).ToList();
	}


    public async Task<List<Post>> GetListOfPostWithMostDiscountAsync()
    {
        var posts = await GetIncludeListNotArchivedAsync();

        return posts.Where(p => p.Discount != null).OrderByDescending(p => p.Discount).Take(4).ToList();
    }


    public async Task<ErrorOr<Post>> ChangeRatingForPostAsync(Guid id, float rating)
    {
        var post = await GetPostByIdAsync(id);

        if (post == null)
            return Error.NotFound("Post is not found");

		if(post.Rate == 0)
			post.Rate = rating;
		else
			post.Rate = (post.Rate + rating) / 2;

	    _dbSet.Update(post);

        await SavePostAsync();

        return post;

    }


	public async Task<int> GetCountOfImagesByPostIdAsync(Guid postId)
	{
		return await _dbSet
					.Where(p => p.Id == postId)
					.Include(post => post.ImagesPost)
					.CountAsync();
	}
}