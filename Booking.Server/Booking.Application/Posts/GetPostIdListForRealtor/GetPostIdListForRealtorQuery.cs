using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostIdListForRealtor;

public record GetPostIdListForRealtorQuery(Guid UserId) : IRequest<ErrorOr<List<Guid>?>>;
 
