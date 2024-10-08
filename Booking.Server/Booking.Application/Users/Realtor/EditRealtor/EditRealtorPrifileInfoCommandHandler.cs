﻿using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.EditRealtor;

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
        var errorOrUser = await userRepository.GetUserByIdAsync(request.UserId);

        if (errorOrUser.IsError)
            return errorOrUser.Errors;

        var user = errorOrUser.Value;

        //Update fields
        if (request.FirstName != user.FirstName)
        {
            user.FirstName = request.FirstName;
		}

        if (request.LastName != user.LastName)
        {
            user.LastName = request.LastName;
		}

        if (request.PhoneNumber != user.PhoneNumber)
        {
            user.PhoneNumber = request.PhoneNumber;
        }

        if (request.Avatar != null && request.Avatar.Length != 0)
        {
            var avatar = await imageStorageService.AddAvatarAsync(user, request.Avatar);

            user.Avatar = avatar;
        }

        //Save User
        var userSavingResult = await userRepository.UpdateProfileAsync(user);

        if (userSavingResult.IsError)
            return userSavingResult.Errors;

        //Set Role
        var role = Roles.Realtor;

        //Generate token
        var token = await jwtTokenGenerator.GenerateJwtTokenAsync(user, role);

        var isEmailchange = false;

        if (request.Email != user.Email)
        {
            //Make token
            var tokenForConfirmEmail = await userAuthenticationService.GenerateEmailChangeTokenAsync(
                user, request.Email!);

			//Make user name
			var userName = await userRepository.GetUserNameByUserAsync(user);

			//Make Link for email
			var sendEmailResult = await emailService.SendChangeEmailEmailAsync(
                request.Email!, tokenForConfirmEmail, request.BaseUrl, userName, user.Id.ToString());

            if (sendEmailResult.IsError) return sendEmailResult.Errors;

            isEmailchange = true;
        }

        return new EditRealtorPrifileInfoCommandResult(token, isEmailchange);
    }
}
