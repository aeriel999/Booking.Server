using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.ChangePassword;

public class ChangePasswordCommandHandler(
	IUserRepository userRepository, IUserAuthenticationService userAuthenticationService)
	: IRequestHandler<ChangePasswordCommand, ErrorOr<User>>
{
	public async Task<ErrorOr<User>> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
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
