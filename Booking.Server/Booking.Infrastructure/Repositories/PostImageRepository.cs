using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Booking.Infrastructure.Repositories;

public class PostImageRepository(BookingDbContext context) : IPostImageRepository
{
	private readonly DbSet<PostImage> _dbSet = context.Set<PostImage>();


	public async Task CraetePostImageAsync(PostImage image)
	{
		await _dbSet.AddAsync(image);

		await context.SaveChangesAsync();
	}

	public async Task CraetePostImageListAsync(List<PostImage> image)
	{
		await _dbSet.AddRangeAsync(image);

		await context.SaveChangesAsync();
	}

	public ErrorOr<PostImage> GetImageByName(string imageName)
	{
		var getImageResult = _dbSet.FirstOrDefault(img => img.Name == imageName);

		if (getImageResult == null) return Error.NotFound();

		return getImageResult;
	}

	public async Task DeletePostImageListByNameAsync(List<PostImage> imageList)
	{
		_dbSet.RemoveRange(imageList);

		await context.SaveChangesAsync();
	}
}
