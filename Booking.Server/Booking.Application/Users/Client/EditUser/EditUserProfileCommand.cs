using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.EditUser;
public record EditUserProfileCommand(Guid Id, string? Email, string baseUrl) : IRequest<ErrorOr<Updated>>;

