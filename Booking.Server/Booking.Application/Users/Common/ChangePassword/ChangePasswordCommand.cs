using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.ChangePassword;
public record ChangePasswordCommand(
    string CurrentPassword,
    string NewPassword,
    string ConfirmNewPassword,
    string UserId) : IRequest<ErrorOr<User>>;