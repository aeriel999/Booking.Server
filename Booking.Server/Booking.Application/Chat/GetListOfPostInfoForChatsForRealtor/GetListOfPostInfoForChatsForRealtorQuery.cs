using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetListOfPostInfoForChatsForRealtor;

public record GetListOfPostInfoForChatsForRealtorQuery(Guid UserId) : IRequest<ErrorOr<List<Post>?>>;
 
