using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ResetPassword;

public class ResetPasswordCommandHandler(
	IUserRepository userRepository, IUserAuthenticationService userAuthenticationService)
	: IRequestHandler<ResetPasswordCommand, ErrorOr<User>>
{
	public async Task<ErrorOr<User>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
	{
		//Check for exist
		var errorOrUser = await userRepository.FindByEmailAsync(request.Email);

		if (errorOrUser.IsError)
			return Error.Validation("User with such email doesn't exist");

		var user = errorOrUser.Value;

		//reset password
		var resetPasswordResult = await userAuthenticationService.ResetPasswordAsync(
			user, request.Token, request.Password);

		return resetPasswordResult;
	}
}

