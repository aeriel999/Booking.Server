using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using Booking.Domain.Constants;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.Users.Client.EditUser;
public class EditUserProfileCommandHandler(IUserRepository repository,
	EmailService emailService,
	IUserAuthenticationService userAuthenticationService,
	IJwtTokenGenerator jwtGenerator)
	: IRequestHandler<EditUserProfileCommand, ErrorOr<EditUserProfileCommandResult>>
{
	public async Task<ErrorOr<EditUserProfileCommandResult>> Handle(EditUserProfileCommand request, CancellationToken cancellationToken)
	{
		var userOError = await repository.FindByIdAsync(request.Id);

		if (userOError.IsError) return userOError.Errors.FirstOrDefault();

		var user = userOError.Value;

		if(!String.IsNullOrEmpty(request.FirstName) && user.FirstName != request.FirstName) 
		{
			user.FirstName = request.FirstName;
		}

        if (!String.IsNullOrEmpty(request.LastName) && user.LastName != request.LastName)
        {
            user.LastName = request.LastName;
        }

		var result = await repository.UpdateProfileAsync(user);

		if(result.IsError) return result.Errors.FirstOrDefault();

		var updatedUser = result.Value;

        var role = Roles.User;
        string token = await jwtGenerator.GenerateJwtTokenAsync(updatedUser, role);

		bool isEmailChanged = false;

		if (request.Email != null && !string.IsNullOrWhiteSpace(request.Email) && !updatedUser.Email!.Equals(request.Email))
		{
			var tokenForConfirmEmail = await userAuthenticationService.GenerateEmailChangeTokenAsync(
                updatedUser, request.Email!);

			var sendEmailResult = await emailService.SendChangeEmailEmailAsync(
							request.Email!, tokenForConfirmEmail, request.baseUrl,
							request.Email, updatedUser.Id.ToString());

			if (sendEmailResult.IsError) return sendEmailResult.Errors;

			isEmailChanged = true;

			return new EditUserProfileCommandResult(token, isEmailChanged);
		}
        return new EditUserProfileCommandResult(token, isEmailChanged);
    }
}

