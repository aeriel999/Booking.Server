using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.ArchivePost;

public record ArchivePostCommand(Guid PostId, Guid UserId) : IRequest<ErrorOr<Success>>;
 
