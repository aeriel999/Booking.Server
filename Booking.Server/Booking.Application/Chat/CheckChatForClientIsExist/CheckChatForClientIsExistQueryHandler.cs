using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CheckChatForClientIsExist;
public class CheckChatForClientIsExistQueryHandler(IUserRepository repositoryUser,
                                                    IPostRepository repositoryPost,
                                                    IChatRoomRepository repositoryChatRoom) : IRequestHandler<CheckChatForClientIsExistQuery, ErrorOr<bool>>
{
    public async Task<ErrorOr<bool>> Handle(CheckChatForClientIsExistQuery request, CancellationToken cancellationToken)
    {
        var userResult = await repositoryUser.GetUserByIdAsync(request.userId);

        if (userResult.IsError) return userResult.Errors.FirstOrDefault();

        var postResult = await repositoryPost.GetPostByIdAsync(request.postId);

        if (postResult == null) return Error.NotFound("Post is not found");

        var result = await repositoryChatRoom.CheckChatForClientIsExist(request.userId, request.postId);

        return result;
    }
}

