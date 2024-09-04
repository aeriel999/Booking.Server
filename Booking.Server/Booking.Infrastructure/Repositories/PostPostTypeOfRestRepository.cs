using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Booking.Infrastructure.Repositories;
public class PostPostTypeOfRestRepository(BookingDbContext context) : IPostPostTypeOfRestRepository
{
    private readonly DbSet<PostPostTypeOfRest> _dbSet = context.Set<PostPostTypeOfRest>();

    public async Task CreatePostPostTypeOfRestListAsync(List<PostPostTypeOfRest> postPostTypeOfRest)
	{
		await _dbSet.AddRangeAsync(postPostTypeOfRest);

		await context.SaveChangesAsync();
	}

	public async Task DeletePostPostTypeOfRestListAsync(List<PostPostTypeOfRest> postPostTypeOfRest)
	{
		_dbSet.RemoveRange(postPostTypeOfRest);  

		await context.SaveChangesAsync();  
	}

	public ErrorOr<PostPostTypeOfRest> GetPostTypeOfRestById(Guid typeId, Guid postId)
	{
		var type = _dbSet
				.Where(t => t.PostTypeOfRestId == typeId && t.PostId == postId)
				.FirstOrDefault();

		if (type == null) return Error.NotFound();

		return type;
	}


}

