using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostFeedbackRepository
{
    Task CreateAsync(Feedback feedback);


    Task<List<Feedback>> GetFeedbacksAsync(Guid id);


    Task DeleteAllFeedbacksAsync(string id);


    Task<List<Booking.Domain.Posts.Post>> GetPostsByUserFeedbacksAsync(Guid id);


    Task<List<Feedback>> GetHistoryOfFeedbacksByUserAsync(Guid id);


    Task<int?>GetPageOfSelectedFeedbackAsync(Guid FeedbackId, Guid PostId);


    Task<List<Feedback>?> GetFeedbacksWhithIncludesForPostIdAsync(Guid postId);
}

