using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.UnBlockUserByAdmin;

public record UnBlockUserByAdminCommand(Guid CurrentUserId, string UserRole, Guid UserId)
	: IRequest<ErrorOr<Success>>;

