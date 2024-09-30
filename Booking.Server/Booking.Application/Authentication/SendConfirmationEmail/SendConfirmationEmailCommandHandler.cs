using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.SendConfirmationEmail;

public class SendConfirmationEmailCommandHandler(
	IUserRepository userRepository, IUserAuthenticationService userAuthenticationService,
	EmailService emailService) : IRequestHandler<SendConfirmationEmailCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(SendConfirmationEmailCommand request, CancellationToken cancellationToken)
	{
		//Check for exist
		var errorOrUser = await userRepository.FindByEmailAsync(request.Email);

		if (errorOrUser.IsError)
			return Error.Validation("User with such email doesn't exist");

		var user = errorOrUser.Value;

		//Generate token
		var token = await userAuthenticationService.GenerateEmailConfirmationTokenAsync(user);

		//Send confirmation
		var sendEmailResult = await emailService.SendEmailConfirmationEmailAsync(
			user.Id, user.Email!, token, request.BaseUrl, user.UserName!);

		return sendEmailResult;
	}
}
