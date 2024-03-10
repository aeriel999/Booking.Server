using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Register;

public record RegisterUserCommand(
   string Email,
   string Password,
   string ConfirmPassword,
   string BaseUrl) : IRequest<ErrorOr<User>>;
