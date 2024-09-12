using Booking.Domain.Chat;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;

public record GetListOfChatsByPostInfoForRealtorQuery(Guid UserId, Guid PostId) : IRequest<ErrorOr<List<ChatRoom>>>;
 