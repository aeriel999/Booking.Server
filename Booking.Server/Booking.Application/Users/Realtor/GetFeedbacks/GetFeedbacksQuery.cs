using Booking.Application.Common.Behaviors;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetFeedbacks;
public record GetFeedbacksQuery(Guid id, int page, int sizeOfPage) :IRequest<ErrorOr<PagedList<Feedback>>>;

