using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CreateMessage;

public record CreateMessageCommand(string Message, Guid RoomId, Guid UserId) :
	IRequest<ErrorOr<string>>;
 
