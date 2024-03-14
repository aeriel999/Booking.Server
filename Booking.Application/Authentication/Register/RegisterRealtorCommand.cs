using Booking.Domain.Users;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Authentication.Register;

public record RegisterRealtorCommand(
   string Email,
   string Password,
   string ConfirmPassword,
   string FirstName,
   string LastName,
   string PhoneNumber,
   IFormFile Avatar,
   string BaseUrl) : IRequest<ErrorOr<User>>;
 