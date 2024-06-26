using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.DeletePost;

public record DeletePostCommand(Guid PostId, Guid UserId) : IRequest<ErrorOr<Deleted>>;
 
