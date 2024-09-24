using Booking.Application.Common.Interfaces.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetGeneralCountOfUnreadedMessages;
public class GetGeneralCountOfUnreadedMessagesQueryHandler(IUserMessageRepository repository) : IRequestHandler<GetGeneralCountOfUnreadedMessagesQuery, ErrorOr<int>>
{
    public async Task<ErrorOr<int>> Handle(GetGeneralCountOfUnreadedMessagesQuery request, CancellationToken cancellationToken)
    {
        var countOfUnreadedMessages = await repository.GetGeneralCountOfUnreadMessages(request.UserId);

        return countOfUnreadedMessages;
    }
}

