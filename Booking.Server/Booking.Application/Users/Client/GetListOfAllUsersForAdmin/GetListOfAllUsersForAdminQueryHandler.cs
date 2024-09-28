using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.GetListOfAllUsersForAdmin;

public class GetListOfAllUsersForAdminQueryHandler(IUserRepository userRepository)
	: IRequestHandler<GetListOfAllUsersForAdminQuery, ErrorOr<PagedList<User>?>>
{
	public async Task<ErrorOr<PagedList<User>?>> Handle(
		GetListOfAllUsersForAdminQuery request, CancellationToken cancellationToken)
	{
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		//Compare user role
		if (request.UserRole.ToLower() != Roles.Admin.ToLower())
			return Error.Validation("Access deny");

		//get list of users
		var listOfUsers = await userRepository.GetClientsListAsync();

		//Get part of list
		var list = PagedList<User>.getPagedList(listOfUsers, request.Page, request.SizeOfPage);

		//Sort list 
		if (list != null)
			list.items = list.items!.OrderBy(item => item.UserName).ToList();

		return list;
	}
}
