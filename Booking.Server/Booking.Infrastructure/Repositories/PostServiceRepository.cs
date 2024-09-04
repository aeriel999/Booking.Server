using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;
public class PostServiceRepository(BookingDbContext context) : IPostServiceRepository
{
    private readonly DbSet<PostService> _dbSet = context.Set<PostService>();

    public async Task CreatePostServiceListAsync(List<PostService> postService)
	{
        await _dbSet.AddRangeAsync(postService);

		await context.SaveChangesAsync();
	}

	public async Task DeletePostServiceListAsync(List<PostService> postService)
	{
		_dbSet.RemoveRange(postService);

		await context.SaveChangesAsync();
	}

	public ErrorOr<PostService> GetPostServiceById(Guid serviceId, Guid postId)
	{
		var service = _dbSet
				.Where(t => t.ServiceId == serviceId && t.PostId == postId)
				.FirstOrDefault();

		if (service == null) return Error.NotFound();

		return service;
	}
}

