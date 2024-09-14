using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomForClientByPostId;
public class GetChatRoomByIdQueryHandler(IChatRoomRepository repositoryChatRoom) : IRequestHandler<GetChatRoomByIdQuery, ErrorOr<ChatRoom>>
{
    public async Task<ErrorOr<ChatRoom>> Handle(GetChatRoomByIdQuery request, CancellationToken cancellationToken)
    {
        var response = await repositoryChatRoom.GetIncludeChatRoomByIdAsync(request.ChatRoomId);

        if (response == null) return Error.NotFound("Chat room is not found");

        return response;
    }
}

