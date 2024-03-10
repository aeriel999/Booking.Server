using Booking.Application.Common.Interfaces.Authentication;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Login;
public class LoginUserQueryHandler(IUserAuthenticationService authenticationService) :
	IRequestHandler<LoginUserQuery, ErrorOr<string>>
{
	public async Task<ErrorOr<string>> Handle(LoginUserQuery command, CancellationToken cancellationToken)
	{
		var loginResult = await authenticationService.LoginUserAsync(command.Email, command.Password);

		return loginResult;
	}
}

