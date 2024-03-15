using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ResetPassword;

public record ResetPssswordCommandstring(
	string Email,
	string Token,
    string Password,
    string ConfirmPassword) : IRequest<ErrorOr<User>>;
