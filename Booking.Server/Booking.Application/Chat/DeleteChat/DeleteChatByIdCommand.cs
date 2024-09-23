using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.DeleteChat;

public record DeleteChatByIdCommand(Guid ChatroomId, Guid UserId) : IRequest<ErrorOr<Deleted>>;
