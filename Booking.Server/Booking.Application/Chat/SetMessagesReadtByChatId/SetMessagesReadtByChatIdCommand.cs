using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.SetMessagesReadtByChatId;

public record SetMessagesReadtByChatIdCommand(Guid ChatId, Guid UserId): IRequest<ErrorOr<Success>>;
 
