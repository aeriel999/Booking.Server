using Booking.Application.Authentication.SendConfirmationEmail;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.TypeExtensions;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Register;

public class RegisterUserCommandHandler(IUserRepository userRepository, ISender mediator) :
	IRequestHandler<RegisterUserCommand, ErrorOr<User>>
{
	public async Task<ErrorOr<User>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
	{
		//Check For exist
		var errorOrUser = await userRepository.FindByEmailAsync(request.Email);

		if (errorOrUser.IsSuccess())
			return Error.Validation("User with such email already exists");

		//Create
		var user = new User { Email = request.Email, UserName = request.Email };

		var role = Roles.User;

		var createUserResult = await userRepository.CreateUserAsync(user, request.Password, role);

		if (createUserResult.IsError)
			return createUserResult.Errors;

		//Send Confirmation

		var sendConfirmationResult = await mediator.Send(
			new SendConfirmationEmailCommand(user.Email, request.BaseUrl));

		//ToDo make handler for this case in UI
		if (sendConfirmationResult.IsError)
			return sendConfirmationResult.Errors;

		return createUserResult;
	}
}
