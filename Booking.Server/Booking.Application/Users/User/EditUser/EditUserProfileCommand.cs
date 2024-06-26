using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Users.User.EditUser;
public record EditUserProfileCommand(Guid Id,string? Email,string baseUrl):IRequest<ErrorOr<Updated>>;

