using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.DeleteUser;
public record DeleteUserCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;


