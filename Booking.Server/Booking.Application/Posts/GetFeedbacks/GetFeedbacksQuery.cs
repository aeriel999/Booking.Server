using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFeedbacks;
public record GetFeedbacksQuery(Guid Id, int Page, int SizeOfPage) : IRequest<ErrorOr<PagedList<Feedback>>>;

