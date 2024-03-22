using Booking.Application.Common.Interfaces.Authentication;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ConfirmEmail;

public class ConfirmEmailCommandHandler(IUserAuthenticationService userAuthenticationService) :
	IRequestHandler<ConfirmEmailCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(
		ConfirmEmailCommand request, CancellationToken cancellationToken)
	{
		var errorOrSuccess = await userAuthenticationService.ConfirmEmailAsync(request.UserId,
			request.Token);

		return errorOrSuccess;
	}
}
