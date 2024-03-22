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
		var errorOrUser = await userRepository.FindByEmilAsync(request.Email);

		if (errorOrUser.IsError)
			return Error.Validation("User with such email doesn't exist");

		var user = errorOrUser.Value;

		//Generate token
		var token = await userAuthenticationService.GenerateEmailConfirmationTokenAsync(user);

		//Send confirmation
		string? userName;

		if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
		{
			if (string.IsNullOrEmpty(user.LastName) && string.IsNullOrEmpty(user.FirstName))
				_ = user.Email;
			else if(string.IsNullOrEmpty(user.LastName))
				_ = user.FirstName;
			else
				_ = user.LastName;
		}

		userName = user.FirstName + " " + user.LastName;

		var sendEmailResult = await emailService.SendEmailConfirmationEmailAsync(
			user.Id, user.Email!, token, request.BaseUrl, userName);

		return sendEmailResult;
	}
}
