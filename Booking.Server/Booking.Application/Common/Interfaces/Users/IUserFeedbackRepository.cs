using Booking.Application.Common.Behaviors;
using Booking.Application.Users.User.SendFeedback;
using Booking.Domain.Users;

namespace Booking.Application.Common.Interfaces.Users;
public interface IUserFeedbackRepository
{
    Task CreateAsync(Feedback feedback);
    Task<PagedList<Feedback>> GetFeedbacksAsync(Guid id, int page, int sizeOfPage);
    Task DeleteAllFeedbacksAsync(string id);
    Task<List<User>> GetRealtorsByUserFeedbacksAsync(string id);
}

