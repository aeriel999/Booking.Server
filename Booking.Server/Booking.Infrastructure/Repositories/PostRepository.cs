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

	public async Task  CreatePostAsync(Post post)
	{
		await _dbSet.AddAsync(post);
	}

	public async Task SavePostAsync()
	{
		await context.SaveChangesAsync();
	}

    /*public async Task<Post?> GetPostByIdAsync(Guid postId)
	{
		return await _dbSet.FindAsync(postId);
	}*/


    public async Task<Post> GetPostByIdAsync(Guid id)
    {
        var posts = await GetIncludeListAsync();
        var post = posts.Find(x => x.Id == id);    
        return post;
    }
    public async Task<PagedList<Post>> GetAllAsync(int page, int sizeOfPage)
    {
        var posts = await GetIncludeListAsync();
        var list = PagedList<Post>.getPagedList(posts, page, sizeOfPage);
        list.items = list.items.OrderByDescending(item => item.PostAt).ToList();
        return list;
    }
    public async Task<List<Post>> Filter(Guid? category, Guid? country, Guid? city, Guid? realtor)
    {
        var posts = await GetIncludeListAsync();

        return posts.Where(p => (category == null ? true : p.CategoryId == category)
             && (country == null ? true : p.Street.City.CountryId == country)
             && (city == null ? true : p.Street.CityId == city)
             && (realtor == null ? true : p.UserId == realtor))
            .Select(p=>p)
            .ToList();
    }
    public async Task<PagedList<Post>> GetFilteredListAsync(Guid? category, Guid? country, Guid? city, Guid? realtor,int page, int sizeOfPage)
    {
        var posts = await Filter(category,country,city,realtor);
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
            .Where(p=> p.Name.ToLower().Equals(name.ToLower()))
            .Select(p=>p).
            ToList(),page,sizeOfPage);

        return list;
    }
    public async Task<List<string>> GetNameOfPostAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, string name)
    {                                                  
        if (String.IsNullOrEmpty(name)) return new List<string>();

        var posts = await Filter(category, country, city, realtor);
        Regex regex = new Regex($@"(^|\s){name.ToLower()}");
        var list = posts
            .Where(p => regex.IsMatch(p.Name.ToLower()))
            .Select(p=>p.Name)
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
			.Include(post => post.ChatRooms)
			.ToListAsync();
	}

	public async Task<List<Post>> GetPostListByRealtorIdAsync(Guid realtorId)
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
 
	//      public async Task<List<Guid>> GetPostIdListByRealtorIdAsync(Guid realtorId)
	//      {
	//	return await _bookingDbContext.Posts
	//	.Where(c => c.UserId == realtorId)
	//	.Select(c => c.Id)
	//	.ToListAsync();
	//}

	//      public PostRepository(BookingDbContext bookingDbContext)
	//      {
	//          _bookingDbContext = bookingDbContext;
	//      }

	//      public IQueryable<TEntity> GetIQueryable()
	//      {
	//          return _bookingDbContext.Set<TEntity>().AsQueryable();
	//      }

	//      public async Task<Post> GetPostOfId(Guid id)
	//      {
	//          var post = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == id);

	//          if (post != null)
	//          {
	//              return post;
	//          }
	//          else
	//          {
	//              throw new InvalidOperationException("Такого оголошення не існує!");
	//          }
	//      }

	//      public async Task<List<Post>> GetAllAsync()
	//      {
	//          var posts = await _bookingDbContext.Posts.ToListAsync();
	//          return posts;
	//      }


	//      public async Task AddNewPost(Post entity)
	//      {
	//          var check = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == entity.Id);

	//          if (check == null)
	//          {
	//              _bookingDbContext.Posts.Add(entity);
	//              await _bookingDbContext.SaveChangesAsync();
	//          }
	//          else
	//          {
	//              throw new InvalidOperationException("Таке оголошення уже існує!");
	//          }
	//      }

	//      public async Task DeletePost(Guid id)
	//      {
	//          var post = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == id);

	//          if (post != null)
	//          {
	//              _bookingDbContext.Posts.Remove(post);
	//              await _bookingDbContext.SaveChangesAsync();
	//          }
	//          else
	//          {
	//              throw new InvalidOperationException("Видалення немодливе. Такого оголошення не існує!");
	//          }
	//      }

	//      public async Task EditPost(Post updatedPost)
	//      {
	//          var existingPost = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == updatedPost.Id);

	//          if (existingPost != null)
	//          {
	//              existingPost.Name = updatedPost.Name;
	//              existingPost.CategoryId=updatedPost.CategoryId;
	//              existingPost.Description=updatedPost.Description;
	//              existingPost.TypeOfRent=updatedPost.TypeOfRent;
	//              existingPost.StreetId = updatedPost.StreetId;
	//              existingPost.BuildingNumber = updatedPost.BuildingNumber;
	//              existingPost.NumberOfRooms = updatedPost.NumberOfRooms;
	//              existingPost.Area = updatedPost.Area;
	//              existingPost.Area = updatedPost.Area;
	//              existingPost.UserId = updatedPost.UserId;
	//              existingPost.IsArhive=updatedPost.IsArhive;
	//              existingPost.Price = updatedPost.Price;
	//              await _bookingDbContext.SaveChangesAsync();
	//          }
	//          else
	//          {
	//              throw new InvalidOperationException("Редагування неможливе. Такого оголошення не існує!");
	//          }
	//      }
	//  }
}