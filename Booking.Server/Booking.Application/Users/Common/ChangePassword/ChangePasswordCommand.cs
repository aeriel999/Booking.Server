using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.ChangePassword;
public record ChangePasswordCommand(
    string CurrentPassword,
    string NewPassword,
    string ConfirmNewPassword,
    Guid UserId) : IRequest<ErrorOr<Booking.Domain.Users.User>>;