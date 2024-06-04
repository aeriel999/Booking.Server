using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CreateChat;

public record CreateChatCommand(
	Guid PostId,
	Guid UserId) : IRequest<ErrorOr<Guid>>; 