using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostFeedbackRepository
{
    Task CreateAsync(Feedback feedback);
    Task<PagedList<Feedback>> GetFeedbacksAsync(Guid id, int page, int sizeOfPage);
    Task DeleteAllFeedbacksAsync(string id);
    Task<List<Booking.Domain.Posts.Post>> GetPostsByUserFeedbacksAsync(Guid id);
}

