using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetRealtorsByUserFeedbacks;
public record GetPostsByUserFeedbacksQuery(Guid Id) : IRequest<ErrorOr<List<Post>>>;

