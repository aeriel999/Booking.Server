using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace Booking.Application.Authentication.SendConfirmationEmail;

public class SendConfirmationEmailCommandHandler(
	IUserRepository userRepository, IUserAuthenticationService userAuthenticationService,
	EmailService emailService) : IRequestHandler<SendConfirmationEmailCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(SendConfirmationEmailCommand request, CancellationToken cancellationToken)
	{
		var errorOrUser = await userRepository.FindByEmilAsync(request.Email);

		if (errorOrUser.IsError)
			return Error.Validation("User with such email doesn't exist");

		var user = errorOrUser.Value;

		var token = await userAuthenticationService.GenerateEmailConfirmationTokenAsync(user);

		var sendEmailResult = await emailService.SendEmailConfirmationEmailAsync(
			user.Id, user.Email!, token, request.BaseUrl);

		return sendEmailResult;
	}
}
