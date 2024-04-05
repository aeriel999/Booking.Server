using Booking.Domain.Users;
using ErrorOr;
using MediatR;
 
namespace Booking.Application.Authentication.ChangeEmail;
 
public record ChangeEmailCommand(
	string UserId,
	string Email,
	string Token) : IRequest<ErrorOr<User>>;