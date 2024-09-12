using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomForClientByPostId;
public record GetChatRoomForClientByPostIdQuery(Guid postId, Guid userId) : IRequest<ErrorOr<ChatRoom>>;

