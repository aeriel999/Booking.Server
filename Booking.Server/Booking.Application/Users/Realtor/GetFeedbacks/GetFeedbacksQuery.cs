using Booking.Application.Common.Behaviors;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetFeedbacks;
public record GetFeedbacksQuery(Guid Id, int Page, int SizeOfPage) :IRequest<ErrorOr<PagedList<Feedback>>>;

