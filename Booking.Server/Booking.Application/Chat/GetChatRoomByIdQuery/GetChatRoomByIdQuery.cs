using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomForClientByPostId;
public record GetChatRoomByIdQuery(Guid ChatRoomId) : IRequest<ErrorOr<ChatRoom>>;

