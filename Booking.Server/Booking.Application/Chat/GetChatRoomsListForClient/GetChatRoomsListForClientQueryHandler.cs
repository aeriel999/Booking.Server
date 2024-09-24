using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomsListForClient;
public class GetChatRoomsListForClientQueryHandler(
    IChatRoomRepository repositoryChatRoom, 
    IUserRepository repositoryUser,
    IUserMessageRepository repositoryUserMessages) 
    : IRequestHandler<GetChatRoomsListForClientQuery, ErrorOr<List<GetChatRoomsListForClientResult>>>
{
    public async Task<ErrorOr<List<GetChatRoomsListForClientResult>>> Handle(GetChatRoomsListForClientQuery request, CancellationToken cancellationToken)
    {
        var user = await repositoryUser.GetUserByIdAsync(request.ClientId);

        if(user.IsError) return user.Errors.FirstOrDefault();

        var listOfRealtorsId = await repositoryChatRoom.GetRealtorChatRoomsIdByClient(request.ClientId);

        List<GetChatRoomsListForClientResult> list = new List<GetChatRoomsListForClientResult>();

        foreach(var item in listOfRealtorsId)
        {
            var currentRealtor = await repositoryUser.GetUserByIdAsync(item);

            if (currentRealtor.IsError) return currentRealtor.Errors.FirstOrDefault();

            var chats = await repositoryChatRoom.GetListOfChatRoomsForClientByRealtorId(item, request.ClientId);
            list.Add(new GetChatRoomsListForClientResult()
            {
                RealtorId = item,
                RealtorAvatar = currentRealtor.Value.Avatar,
                RealtorName = $"{currentRealtor.Value.FirstName} {currentRealtor.Value.LastName}",
                HasUnreadMessages = await repositoryUserMessages.GetCountOfUnreadMessages(chats.Select(c=>c.ChatRoomId).ToList(),request.ClientId) > 0 ? true : false,
                UnreadMessages = await repositoryUserMessages.GetCountOfUnreadMessages(chats.Select(c => c.ChatRoomId).ToList(), request.ClientId),
                ChatsForClient = chats
            });
        }

        return list;
    }
}

