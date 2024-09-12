using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.CheckChatForClientIsExist;
public record CheckChatForClientIsExistQuery(Guid userId,Guid postId):IRequest<ErrorOr<bool>>;

