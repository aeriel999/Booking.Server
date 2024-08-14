using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;
public class PostPostTypeOfRestRepository(BookingDbContext context) : IPostPostTypeOfRestRepository
{
    private readonly DbSet<PostPostTypeOfRest> _dbSet = context.Set<PostPostTypeOfRest>();

    public async Task CreatePostPostTypeOfRestAsync(PostPostTypeOfRest postPostTypeOfRest)
    {
        await _dbSet.AddAsync(postPostTypeOfRest);

		await context.SaveChangesAsync();
	}

}

