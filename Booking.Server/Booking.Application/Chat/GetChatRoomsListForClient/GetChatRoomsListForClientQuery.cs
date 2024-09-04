using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomsListForClient;
public record GetChatRoomsListForClientQuery(Guid ClientId) : IRequest<ErrorOr<List<GetChatRoomsListForClientResult>>>;
