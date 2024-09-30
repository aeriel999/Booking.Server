using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.BlockUserByAdmin;

public class BlockUserByAdminCommandHandler(IUserRepository userRepository)
	: IRequestHandler<BlockUserByAdminCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(BlockUserByAdminCommand request, CancellationToken cancellationToken)
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

		// Block the user by setting LockoutEnd to a future date
		user.LockoutEnd = DateTimeOffset.UtcNow.AddYears(100); // Lockout for a long time

		// Optionally, set AccessFailedCount to a high value to enforce the lockout
		user.AccessFailedCount = int.MaxValue;

		//Save block
		var saveResult = await userRepository.UpdateProfileAsync(user);

		if (saveResult.IsError)
			return Error.Validation("Error in block");

		return Result.Success;
	}
}
