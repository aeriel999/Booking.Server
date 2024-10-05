using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.DeleteUserByAdmin;

public record DeleteUserByAdminCommand(Guid CurrentUserId, string UserRole, Guid UserId)
	: IRequest<ErrorOr<Deleted>>;
