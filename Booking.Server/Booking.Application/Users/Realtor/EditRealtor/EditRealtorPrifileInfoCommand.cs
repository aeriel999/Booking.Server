using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.EditRealtor;

public record EditRealtorPrifileInfoCommand(
   string? Email,
   string? FirstName,
   string? LastName,
   string? PhoneNumber,
   byte[]? Avatar,
   string UserId,
   string BaseUrl) : IRequest<ErrorOr<EditRealtorPrifileInfoCommandResult>>;