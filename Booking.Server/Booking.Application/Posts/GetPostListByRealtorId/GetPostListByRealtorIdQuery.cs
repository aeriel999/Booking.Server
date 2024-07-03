using ErrorOr;
using MediatR;
using Booking.Domain.Posts;

namespace Booking.Application.Posts.GetPostListByRealtorId;
public record GetPostListByRealtorIdQuery(Guid Id):IRequest<ErrorOr<List<Post>>>;


