using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.BlockUserByAdmin;

public record BlockUserByAdminCommand(Guid CurrentUserId, string UserRole, Guid UserId)
	: IRequest<ErrorOr<Success>>;
 