using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Users.Common.ChangePassword;
using ErrorOr;
using MediatR;

namespace Booking.Application.ForUsers.Common.ChangePassword;

public class ChangePasswordCommandHandler(
	IUserRepository userRepository, IUserAuthenticationService userAuthenticationService)
	: IRequestHandler<ChangePasswordCommand, ErrorOr<Booking.Domain.Users.User>>
{
	public async Task<ErrorOr<Booking.Domain.Users.User>> Handle(
		ChangePasswordCommand request, CancellationToken cancellationToken)
	{
		//Get User
		var userOrError = await userRepository.FindByIdAsync(request.UserId);

		if (userOrError.IsError)
			return userOrError;

		var user = userOrError.Value;

		//Change password
		var changeUserResult = await userAuthenticationService.ChangePasswordAsync(
			user, request.CurrentPassword, request.NewPassword);

		return changeUserResult;
	}
}
