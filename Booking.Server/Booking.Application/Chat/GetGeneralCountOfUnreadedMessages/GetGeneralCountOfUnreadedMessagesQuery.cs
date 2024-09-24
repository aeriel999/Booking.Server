using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetGeneralCountOfUnreadedMessages;
public record GetGeneralCountOfUnreadedMessagesQuery(Guid UserId) : IRequest<ErrorOr<int>>;

