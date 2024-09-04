using MediatR;
using ErrorOr;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Authentication;

namespace Booking.Application.Users.Common.ChangeAvatar;

public class ChangeAvatarCommandHandler(
	IUserRepository userRepository,
	IImageStorageService imageStorageService,
	IJwtTokenGenerator jwtTokenGenerator)
	: IRequestHandler<ChangeAvatarCommand, ErrorOr<string>>
{
	public async Task<ErrorOr<string>> Handle(ChangeAvatarCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var errorOrUser = await userRepository.GetUserByIdAsync(request.UserId);

		if (errorOrUser.IsError)
			return errorOrUser.Errors;

		var user = errorOrUser.Value;

		//SetAvatar
		var avatar = await imageStorageService.AddAvatarAsync(user, request.Avatar);

		user.Avatar = avatar;

		var updateUserResult = await userRepository.UpdateProfileAsync(user);

		if(updateUserResult.IsError)
			return updateUserResult.Errors;

		//Set Role
		var role = await userRepository.GetRoleByUserAsync(user);

		if(role.IsError)
			return role;

		//Generate token
		var token = await jwtTokenGenerator.GenerateJwtTokenAsync(user, role.Value);

		return token;
	}
}
