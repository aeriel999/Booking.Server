using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;
public class PostServiceRepository(BookingDbContext context) : IPostServiceRepository
{
    private readonly DbSet<PostService> _dbSet = context.Set<PostService>();

    public async Task CreatePostServiceAsync(PostService postService)
    {
        await _dbSet.AddAsync(postService);

		await context.SaveChangesAsync();
	}
}

