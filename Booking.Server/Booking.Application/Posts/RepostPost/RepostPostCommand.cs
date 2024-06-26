using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.RepostPost;

public record RepostPostCommand(Guid PostId, Guid UserId) : IRequest<ErrorOr<Success>>;
 
