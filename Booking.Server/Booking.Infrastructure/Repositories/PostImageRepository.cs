using Ardalis.Specification.EntityFrameworkCore;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Booking.Infrastructure.Repositories;

public class PostImageRepository(BookingDbContext context) : IPostImageRepository
{
	private readonly DbSet<PostImage> _dbSet = context.Set<PostImage>();

	public async Task CraetePostImageAsync(PostImage image)
	{
		await _dbSet.AddAsync(image);
	}

	public async Task DeletePostImageByNameAsync(string imageName)
	{
		var postImage = await _dbSet.FirstOrDefaultAsync(img => img.Name == imageName);

		if (postImage != null)
		{
			_dbSet.Remove(postImage);

			await context.SaveChangesAsync();
		}
	}

	public async Task SavePostImageAsync()
	{
		await context.SaveChangesAsync();
	}

	//public async Task<PostImage> GetByIdAsync(Guid id)
	//{
	//	return await bookingDbContext.Images.FirstOrDefaultAsync(p => p.PostId == id);
	//}

	//public async Task<IEnumerable<PostImage>> GetAllAsync()
	//{

	//	return await bookingDbContext.Images.ToListAsync();
	//}

	//public async Task<IEnumerable<PostImage>> GetByPostIdAsync(Guid postId)
	//{
	//	return await bookingDbContext.Images.Where(p => p.PostId == postId).ToListAsync();
	//}

	//public async Task AddAsync(PostImage entity)
	//{
	//	bookingDbContext.Images.Add(entity);

	//	await bookingDbContext.SaveChangesAsync();

	//}

	//public Task UpdateAsync(PostImage entity)
	//{
	//	var existingEntity = bookingDbContext.Images.FirstOrDefault(p => p.PostId == entity.PostId);
	//	if (existingEntity != null)
	//	{
	//		existingEntity.Name = entity.Name;
	//		existingEntity.Priority = entity.Priority;
	//	}
	//	return Task.CompletedTask;
	//}

	//public Task DeleteAsync(Guid id)
	//{
	//	var entityToRemove = bookingDbContext.Images.FirstOrDefault(p => p.PostId == id);
	//	if (entityToRemove != null)
	//	{
	//		bookingDbContext.Images.Remove(entityToRemove);
	//	}
	//	return Task.CompletedTask;
	//}
}
