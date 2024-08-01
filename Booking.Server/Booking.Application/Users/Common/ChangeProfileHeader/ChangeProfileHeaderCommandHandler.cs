using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.ChangeProfileHeader;

public class ChangeProfileHeaderCommandHandler(
	IUserRepository userRepository,
	IImageStorageService imageStorageService,
	IJwtTokenGenerator jwtTokenGenerator)
	: IRequestHandler<ChangeProfileHeaderCommand, ErrorOr<string>>
{
	public async Task<ErrorOr<string>> Handle(ChangeProfileHeaderCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var errorOrUser = await userRepository.FindByIdAsync(request.UserId);

		if (errorOrUser.IsError)
			return errorOrUser.Errors;

		var user = errorOrUser.Value;

		//SetAvatar
		var profileHeaderImage = await imageStorageService.AddProfileHeaderImageAsync(user, request.ProfileHeaderImage);

		user.ProfileHeaderImage = profileHeaderImage;

		var updateUserResult = await userRepository.UpdateProfileAsync(user);

		if (updateUserResult.IsError)
			return updateUserResult.Errors;

		//Set Role
		var role = await userRepository.GetRoleByUserAsync(user);

		if (role.IsError)
			return role;

		//Generate token
		var token = await jwtTokenGenerator.GenerateJwtTokenAsync(user, role.Value);

		return token;
	}
}
