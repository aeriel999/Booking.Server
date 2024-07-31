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
    public async  Task<PagedList<Feedback>> GetFeedbacksAsync(Guid id, int page, int sizeOfPage)
    {
            var list = await _dbSet
            .Where(f => f.PostId == id)
            .OrderByDescending(f => f.FeedbackAt)
            .Include(f => f.Client)
            .ToListAsync();

            var pagedList = PagedList<Feedback>.getPagedList(list, page, sizeOfPage);

            return pagedList; 
    }
    public async Task DeleteAllFeedbacksAsync(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (await userManager.IsInRoleAsync(user, Roles.User))
        {
           var feedbacks = await _dbSet.Where(f => f.ClientId == user.Id).ToListAsync();
           _dbSet.RemoveRange(feedbacks);
        }
       await context.SaveChangesAsync();
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
}

