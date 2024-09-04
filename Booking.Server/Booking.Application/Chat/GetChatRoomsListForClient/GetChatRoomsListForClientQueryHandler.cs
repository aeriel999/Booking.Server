using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomsListForClient;
public class GetChatRoomsListForClientQueryHandler(
    IChatRoomRepository repositoryChatRoom, IUserRepository repositoryUser) 
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

            list.Add(new GetChatRoomsListForClientResult()
            {
                RealtorId = item,
                RealtorAvatar = currentRealtor.Value.Avatar,
                RealtorName = $"{currentRealtor.Value.FirstName} {currentRealtor.Value.LastName}",
                HasUnreadMessages = false,
                UnreadMessages = null,
                ChatsForClient = await repositoryChatRoom.GetListOfChatRoomsForClientByRealtorId(item)
            });
        }

        return list;
    }
}

