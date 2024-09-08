using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetNumberOfUnleastMessages;

public record GetNumberOfUnleastMessagesQuery(Guid UserId) : IRequest<ErrorOr<int>>;
 
