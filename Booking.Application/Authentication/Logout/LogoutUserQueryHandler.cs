using Booking.Application.Common.Interfaces.Authentication;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Logout;

public class LogoutUserQueryHandler(IUserAuthenticationService userAuthenticationService)
	: IRequestHandler<LogoutUserQuery, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(LogoutUserQuery request, CancellationToken cancellationToken)
	{
		//Logout
		var logoutResult = await userAuthenticationService.LogoutUserAsync();	

		return logoutResult;
	}
}
