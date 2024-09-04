using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.CheckPasswordIsNotNull;
public record CheckPasswordIsNotNullQuery(Guid UserId) : IRequest<ErrorOr<bool>>;


