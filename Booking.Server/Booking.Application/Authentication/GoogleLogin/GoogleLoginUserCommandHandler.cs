using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.Users;
using ErrorOr;
using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.Authentication.GoogleLogin;

public class GoogleLoginUserCommandHandler(
	IUserRepository userRepository,
	IJwtTokenGenerator jwtTokenGenerator)
	: IRequestHandler<GoogleLoginUserCommand, ErrorOr<GoogleLoginUserCommandResult>>
{
	public async Task<ErrorOr<GoogleLoginUserCommandResult>> Handle(
		GoogleLoginUserCommand request, CancellationToken cancellationToken)
	{
		//ValidateToken
		GoogleJsonWebSignature.Payload validPayload = await GoogleJsonWebSignature.ValidateAsync(
			request.GoogleToken);

		if (validPayload == null)
			return Error.Validation();

		var info = new UserLoginInfo("Google", validPayload.Subject, "Google");

		//Set role
		var role = Roles.User;

		//Check user for existing
		var errorOrUser = await userRepository.FindByEmailAsync(validPayload.Email);
 
		var googleUser = await userRepository.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

		var isRegister = true;

		//Create user
		if (googleUser == null && errorOrUser.IsError)
		{
			googleUser = new User
			{
				UserName = (validPayload.GivenName + " " + validPayload.FamilyName).TrimEnd().TrimStart(),
				Email = validPayload.Email,
				FirstName = validPayload.GivenName,
				LastName = validPayload.FamilyName,
				Avatar = validPayload.Picture,
			};

			var result = await userRepository.CreateUserAsync(googleUser, role);

			if (result.IsError)
			{
				return Error.Validation("Error in creating of new googleUser");
			}

			var addLoginResult = await userRepository.AddLoginAsync(googleUser, info);

			if (!addLoginResult.Succeeded)
			{
				return Error.Validation("Error in creating of new googleUser");
			}

			isRegister = false;
		}
		else if (!errorOrUser.IsError)
		{
			var roleOrError = await userRepository.FindRolesByUserIdAsync(errorOrUser.Value);

			if (roleOrError.IsError)
				return Error.NotFound("Role of user is not found");

			role = roleOrError.Value.FirstOrDefault();

			googleUser = errorOrUser.Value;
		}

		//Validate token
		var token = await jwtTokenGenerator.GenerateJwtTokenAsync(googleUser!, role!);

		return new GoogleLoginUserCommandResult(token, isRegister);
	}
}
