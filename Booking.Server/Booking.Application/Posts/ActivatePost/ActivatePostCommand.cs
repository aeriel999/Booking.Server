using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.ActivatePost;

public record ActivatePostCommand(Guid PostId, Guid UserId, string Role) : IRequest<ErrorOr<Success>>;
 
