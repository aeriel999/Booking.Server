using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFeedbacksByClient;
public record GetHistoryOfFeedbacksByClientQuery(Guid ClientId, int Page, int SizeOfPage) : IRequest<ErrorOr<PagedList<Feedback>>>;
