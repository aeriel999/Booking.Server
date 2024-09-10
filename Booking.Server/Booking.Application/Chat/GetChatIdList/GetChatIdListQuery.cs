using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatIdList;

public record GetChatIdListQuery(Guid UserId, string Role) : IRequest<ErrorOr<List<Guid>?>>;

 
