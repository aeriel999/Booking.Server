using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ConfirmEmail;

public class ConfirmEmailCommandHandler(
	IUserAuthenticationService userAuthenticationService,
	IJwtTokenGenerator jwtTokenGenerator,
	IUserRepository userRepository) :
	IRequestHandler<ConfirmEmailCommand, ErrorOr<string>>
{
	public async Task<ErrorOr<string>> Handle(
		ConfirmEmailCommand request, CancellationToken cancellationToken)
	{
		//confirmation of email
		var errorOrSuccess = await userAuthenticationService.ConfirmEmailAsync(request.UserId,
			request.Token);

		if (errorOrSuccess.IsError)
			return errorOrSuccess.Errors;

		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);
		 
		if(userOrError.IsError)
			return userOrError.Errors;

		var user = userOrError.Value;

		//Get role
		var roleOrError = await userRepository.FindRolesByUserIdAsync(user);

		if (roleOrError.IsError)	
			return roleOrError.Errors;

		var role = roleOrError.Value.First();	

		//Generate token
		var token = await jwtTokenGenerator.GenerateJwtTokenAsync(user, role);

		return token;
	}
}
