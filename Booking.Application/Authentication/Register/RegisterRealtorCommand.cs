using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Register;

public record RegisterRealtorCommand(
   string Email,
   string Password,
   string ConfirmPassword,
   string FirstName,
   string LastName,
   string PhoneNumber,
   byte[] Avatar,
   string BaseUrl) : IRequest<ErrorOr<User>>;
 