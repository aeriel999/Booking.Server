using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

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
}