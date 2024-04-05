using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ChangeEmail;

public class ChangeEmailCommandHandler(
	IUserAuthenticationService userAuthenticationService,
	IUserRepository userRepository)
	: IRequestHandler<ChangeEmailCommand, ErrorOr<User>>
{
	public async Task<ErrorOr<User>> Handle(ChangeEmailCommand request, CancellationToken cancellationToken)
	{
		//get user
		var getUserResult = await userRepository.FindByIdAsync(request.UserId);

		if (getUserResult.IsError)
			return getUserResult;

		var user = getUserResult.Value;

		//confirm change
		var changeEmailResult = await userAuthenticationService.ChangeEmailAsync(
			user, request.Email, request.Token);

		if (changeEmailResult.IsError)
			return changeEmailResult;

		//change of userName
		user.UserName = request.Email;
		user.NormalizedUserName = request.Email.ToLower();

		var resultOfUserUpdate = await userRepository.SaveUserAsync(user);

        return resultOfUserUpdate;
	}
}
