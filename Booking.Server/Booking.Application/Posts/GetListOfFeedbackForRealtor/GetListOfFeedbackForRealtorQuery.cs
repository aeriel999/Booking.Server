using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfFeedbackForRealtor;

public record GetListOfFeedbackForRealtorQuery(
	Guid UserId,
	int Page, 
	int SizeOfPage) : IRequest<ErrorOr<PagedList<Feedback>?>>;
 
