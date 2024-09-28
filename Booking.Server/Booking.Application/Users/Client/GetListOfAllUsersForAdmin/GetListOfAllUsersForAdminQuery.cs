using Booking.Application.Common.Behaviors;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.GetListOfAllUsersForAdmin;

public record GetListOfAllUsersForAdminQuery(Guid UserId, string UserRole, int Page, int SizeOfPage)
	: IRequest<ErrorOr<PagedList<User>?>>;
 
