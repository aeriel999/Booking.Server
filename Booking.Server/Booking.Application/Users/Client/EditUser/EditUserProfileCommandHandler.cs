using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Common.Services;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.EditUser;
public class EditUserProfileCommandHandler(IUserRepository repository,
	EmailService emailService,
	IUserAuthenticationService userAuthenticationService)
	: IRequestHandler<EditUserProfileCommand, ErrorOr<Updated>>
{
	public async Task<ErrorOr<Updated>> Handle(EditUserProfileCommand request, CancellationToken cancellationToken)
	{
		var user = await repository.FindByIdAsync(request.Id);

		if (user.IsError) return user.Errors.FirstOrDefault();

		if (request.Email != null && !user.Value.Email.Equals(request.Email))
		{
			var tokenForConfirmEmail = await userAuthenticationService.GenerateEmailChangeTokenAsync(
				user.Value, request.Email!);

			var sendEmailResult = await emailService.SendChangeEmailEmailAsync(
							request.Email!, tokenForConfirmEmail, request.baseUrl,
							request.Email, user.Value.Id.ToString());

			if (sendEmailResult.IsError) return sendEmailResult.Errors;


			return Result.Updated;
		}
		return Result.Updated;
	}
}

