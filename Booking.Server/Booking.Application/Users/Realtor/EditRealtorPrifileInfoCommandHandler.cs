using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using Booking.Domain.Constants;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;
using System.Security.Claims;

namespace Booking.Application.Users.Realtor;

public class EditRealtorPrifileInfoCommandHandler(
	IUserRepository userRepository, 
	IImageStorageService imageStorageService, 
	IJwtTokenGenerator jwtTokenGenerator,
	IUserAuthenticationService userAuthenticationService,
	EmailService emailService) :
	IRequestHandler<EditRealtorPrifileInfoCommand, ErrorOr<EditRealtorPrifileInfoCommandResult>>
{
	public async Task<ErrorOr<EditRealtorPrifileInfoCommandResult>> Handle(
		EditRealtorPrifileInfoCommand request, 
		CancellationToken cancellationToken)
	{
		 

		//Get user
		var errorOrUser = await userRepository.FindByIdAsync(request.UserId);

		if (errorOrUser.IsError)
			return errorOrUser.Errors;

		var user = errorOrUser.Value;

		//Update fields
		if (request.FirstName != null)
		{ 
			user.FirstName = request.FirstName;	
		}

		if (request.LastName != null)
		{
			user.LastName = request.LastName;
		}

		if (request.PhoneNumber != null)
		{
			user.PhoneNumber = request.PhoneNumber;
		}

		if (request.Avatar != null && request.Avatar.Length != 0) 
		{
			var avatar = await imageStorageService.AddAvatarAsync(user, request.Avatar);

			user.Avatar = avatar;
		}

		//Save User
		var userSavingResult = await userRepository.SaveUserAsync(user);

		if (userSavingResult.IsError)
			return userSavingResult.Errors;

		//Set Role
		var role = Roles.Realtor;

		//Generate token
		var token = await jwtTokenGenerator.GenerateJwtTokenAsync(user, role);

		var isEmailchange = false;

		if (request.Email != null) 
		{
			//Make token
			var tokenForConfirmEmail = await userAuthenticationService.GenerateEmailChangeTokenAsync(
				user, request.Email);

			//Make Link for email
			string? userName;

			if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
			{
				if (string.IsNullOrEmpty(user.LastName) && string.IsNullOrEmpty(user.FirstName))
					userName = request.Email;
				else if (string.IsNullOrEmpty(user.LastName))
					userName = user.FirstName;
				else
					userName = user.LastName;
			}
			else
			{
				userName = user.FirstName + " " + user.LastName;
			}

			var sendEmailResult = await emailService.SendChangeEmailEmailAsync(
				user.Email!, tokenForConfirmEmail, request.BaseUrl, userName!);

			if (sendEmailResult.IsError) return sendEmailResult.Errors;

			isEmailchange = true;
		}

		return new EditRealtorPrifileInfoCommandResult(token, isEmailchange);
	}
}
