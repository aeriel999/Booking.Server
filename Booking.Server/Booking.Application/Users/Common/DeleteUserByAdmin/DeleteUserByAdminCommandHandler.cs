using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.DeleteUserByAdmin;

public class DeleteUserByAdminCommandHandler(IUserRepository userRepository)
	: IRequestHandler<DeleteUserByAdminCommand, ErrorOr<Deleted>>
{
	public async Task<ErrorOr<Deleted>> Handle(DeleteUserByAdminCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var currentUserOrError = await userRepository.GetUserByIdAsync(request.CurrentUserId);

		if (currentUserOrError.IsError)
			return Error.NotFound("User is not found");

		//Compare user role
		if (request.UserRole.ToLower() != Roles.Admin.ToLower())
			return Error.Validation("Access deny");

		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		var user = userOrError.Value;

		//Delete user
		var saveResult = await userRepository.DeleteUserAsync(user.Id);

		if (saveResult.IsError)
			return Error.Validation("Error in deleting user");

		return Result.Deleted;
	}
}
