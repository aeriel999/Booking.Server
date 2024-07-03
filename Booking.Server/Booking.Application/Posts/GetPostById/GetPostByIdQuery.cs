using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostById;
public record GetPostByIdQuery(Guid Id) : IRequest<ErrorOr<Post>>;

