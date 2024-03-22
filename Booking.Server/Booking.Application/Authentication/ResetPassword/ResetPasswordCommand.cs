using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ResetPassword;

public record ResetPasswordCommand(
	string Email,
	string Token,
    string Password,
    string ConfirmPassword) : IRequest<ErrorOr<User>>;
