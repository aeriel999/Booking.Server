using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ConfirmEmail;

public record ConfirmEmailCommand(
	Guid UserId,
	string Token) : IRequest<ErrorOr<Success>>;
