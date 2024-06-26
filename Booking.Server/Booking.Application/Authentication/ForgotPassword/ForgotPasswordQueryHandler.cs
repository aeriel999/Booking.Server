using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ForgotPassword;

public class ForgotPasswordQueryHandler(
	IUserRepository userRepository, 
	IUserAuthenticationService userAuthenticationService,
	EmailService emailService) :
	IRequestHandler<ForgotPasswordQuery, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(ForgotPasswordQuery request, CancellationToken cancellationToken)
	{
		//Check for exist
		var errorOrUser = await userRepository.FindByEmailAsync(request.Email);

		if (errorOrUser.IsError)
			return Error.Validation("User with such email doesn't exist");

		var user = errorOrUser.Value;

		//Generate token
		var token = await userAuthenticationService.GeneratePasswordResetTokenAsync(user);

		//Make Link for email
		var userName = await userRepository.GetUserNameByUserAsync(user);

		var sendEmailResult = await emailService.SendResetPasswordEmailAysync(
			user.Email!, token, request.BaseUrl, userName!);

		return sendEmailResult;
	}
}
