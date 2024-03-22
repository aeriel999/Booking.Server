using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Login;

public record LoginUserQuery(
	string Email,
	string Password) : IRequest<ErrorOr<string>>;