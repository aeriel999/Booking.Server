using ErrorOr;
using MediatR;

namespace Booking.Application.Users.User.EditUser;
public record EditUserProfileCommand(Guid Id, string? Email,string baseUrl):IRequest<ErrorOr<Updated>>;

