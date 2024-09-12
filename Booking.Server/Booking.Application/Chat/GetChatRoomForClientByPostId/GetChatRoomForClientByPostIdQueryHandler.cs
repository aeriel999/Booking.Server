using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomForClientByPostId;
public class GetChatRoomForClientByPostIdQueryHandler(IChatRoomRepository repositoryChatRoom) : IRequestHandler<GetChatRoomForClientByPostIdQuery, ErrorOr<ChatRoom>>
{
    public async Task<ErrorOr<ChatRoom>> Handle(GetChatRoomForClientByPostIdQuery request, CancellationToken cancellationToken)
    {
        var response = await repositoryChatRoom.GetChatRoomByPostIdAndUserIdAsync(request.postId,request.userId);

        if (response == null) return Error.NotFound("Chat room is not found");

        return response;
    }
}

