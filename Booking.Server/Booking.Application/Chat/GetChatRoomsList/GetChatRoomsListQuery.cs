using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomsList;

public record GetChatRoomsListQuery(Guid UserId, string UserRole) 
	: IRequest<ErrorOr<GetChatRoomsListQueryResult>>;
 
