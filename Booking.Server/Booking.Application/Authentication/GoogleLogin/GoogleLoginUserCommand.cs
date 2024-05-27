using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.GoogleLogin;

public record GoogleLoginUserCommand(string GoogleToken) : IRequest<ErrorOr<string>>;
 