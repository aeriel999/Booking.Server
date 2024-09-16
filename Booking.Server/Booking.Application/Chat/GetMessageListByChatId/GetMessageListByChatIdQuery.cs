using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetMessageListByChatId;

public record GetMessageListByChatIdQuery(Guid ChatRoomId, Guid UserId) : IRequest<ErrorOr<List<UserMessage>?>>;
 
