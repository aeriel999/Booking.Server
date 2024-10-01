using Booking.Application.Common.Behaviors;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetListOfAllRealtorsForAdmin;

public record GetListOfAllRealtorsForAdminQuery(Guid UserId, string UserRole, int Page, int SizeOfPage)
	: IRequest<ErrorOr<PagedList<User>?>>;
