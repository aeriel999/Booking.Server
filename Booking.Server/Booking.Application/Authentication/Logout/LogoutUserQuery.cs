using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Logout;

public record LogoutUserQuery() : IRequest<ErrorOr<Success>>;
 
