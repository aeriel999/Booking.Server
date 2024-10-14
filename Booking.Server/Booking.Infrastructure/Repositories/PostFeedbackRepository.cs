using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Constants;
using Booking.Domain.Posts;
using Booking.Domain.Users;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;
public class PostFeedbackRepository(BookingDbContext context,UserManager<User> userManager) : IPostFeedbackRepository
{
    private readonly DbSet<Feedback> _dbSet = context.Set<Feedback>();


    public async Task CreateAsync(Feedback feedback)
    {
        await _dbSet.AddAsync(feedback);
    }


    public async  Task<List<Feedback>> GetFeedbacksAsync(Guid id)
    {
            return await _dbSet
            .Where(f => f.PostId == id)
            .OrderByDescending(f => f.FeedbackAt)
            .Include(f => f.Client)
            .ToListAsync();
    }


    public async Task DeleteAllFeedbacksAsync(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user != null)
        {
            if (await userManager.IsInRoleAsync(user, Roles.User))
            {
                var feedbacks = await _dbSet.Where(f => f.ClientId == user.Id).ToListAsync();
                _dbSet.RemoveRange(feedbacks);
            }
            await context.SaveChangesAsync();
        }

        
    }


    public async Task<List<Post>> GetPostsByUserFeedbacksAsync(Guid id)
    {
        var res = await _dbSet
            .Where(p => p.ClientId == id)
            .Include(p => p.Post)
            .ThenInclude(p => p!.ImagesPost)
            .Select(p => p.Post)
            .Distinct()
            .ToListAsync();

        return res!;
    }


    public async Task<List<Feedback>> GetHistoryOfFeedbacksByUserAsync(Guid id)
    {
        return await _dbSet
        .Where(f => f.ClientId == id)
        .OrderByDescending(f => f.FeedbackAt)
        .Include(f => f.Client)
        .Include(f => f.Post!.Street!.City!.Country)
        .Include(f => f.Post!.ImagesPost)
        .ToListAsync();
    }

    public async Task<int?> GetPageOfSelectedFeedbackAsync(Guid FeedbackId, Guid PostId)
    {
        var feedbacks = await _dbSet
            .Where(f => f.PostId == PostId)
            .OrderByDescending(f => f.FeedbackAt)
            .Select(f=>f.Id)
            .ToArrayAsync();

        var index = Array.IndexOf(feedbacks, FeedbackId) + 1;
        if (index == 0) return null;

        return (int)Math.Ceiling(index / (decimal)2); 
    }

	public async Task<List<Feedback>?> GetFeedbacksWhithIncludesForPostIdAsync(Guid postId)
	{
		return await _dbSet
		.Where(f => f.PostId == postId)
		.OrderByDescending(f => f.FeedbackAt)
		.Include(f => f.Client)
		.Include(f => f.Post!.Street!.City!.Country)
		.Include(f => f.Post!.ImagesPost)
		.ToListAsync();
	}
}

