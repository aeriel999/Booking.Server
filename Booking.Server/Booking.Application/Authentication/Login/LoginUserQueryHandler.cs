using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Login;

public class LoginUserQueryHandler(
	IUserAuthenticationService authenticationService, 
	IUserRepository userRepository, 
	IJwtTokenGenerator jwtTokenGenerator) :
	IRequestHandler<LoginUserQuery, ErrorOr<string>>
{
	public async Task<ErrorOr<string>> Handle(LoginUserQuery command, CancellationToken cancellationToken)
	{
		//Check for exist
		var errorOrUser = await userRepository.FindByEmailAsync(command.Email);

		if (errorOrUser.IsError)
			return Error.Validation("User with such email doesn't exist");

		var user = errorOrUser.Value;

		//Login
		var errorOrLoginResult = await authenticationService.LoginUserAsync(user, command.Password);

		if(errorOrLoginResult.IsError)
			return errorOrLoginResult;

		var role = errorOrLoginResult.Value;

		//Generate token
		var token = await jwtTokenGenerator.GenerateJwtTokenAsync(user, role);

		return token;
	}
}
