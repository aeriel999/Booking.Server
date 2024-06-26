using ErrorOr;
using MediatR;

namespace Booking.Application.Users.User.DeleteUser;
public record DeleteUserCommand(string id):IRequest<ErrorOr<Deleted>>;


