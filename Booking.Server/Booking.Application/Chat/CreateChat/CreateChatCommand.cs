using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CreateChat;

public record CreateChatCommand(
	Guid PostId,
	string UserId) : IRequest<ErrorOr<Guid>>; 