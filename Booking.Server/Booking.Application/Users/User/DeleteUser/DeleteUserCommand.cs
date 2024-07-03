using ErrorOr;
using MediatR;

namespace Booking.Application.Users.User.DeleteUser;
public record DeleteUserCommand(Guid Id):IRequest<ErrorOr<Deleted>>;


