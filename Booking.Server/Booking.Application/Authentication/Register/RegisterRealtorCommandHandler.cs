using Booking.Application.Authentication.SendConfirmationEmail;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.TypeExtensions;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.Register;

public class RegisterRealtorCommandHandler(
	IUserRepository userRepository, ISender mediator, IImageStorageService imageStorageService) :
	IRequestHandler<RegisterRealtorCommand, ErrorOr<User>>
{
	public async Task<ErrorOr<User>> Handle(RegisterRealtorCommand request, 
		CancellationToken cancellationToken)
	{
		//Check For exist
		var errorOrUser = await userRepository.FindByEmailAsync(request.Email);

		if (errorOrUser.IsSuccess())
			return Error.Validation("User with such email already exists");

		//Create user
		var user = new User
		{
			Email = request.Email,
			UserName = request.Email,
			FirstName = request.FirstName,
			LastName = request.LastName,
			PhoneNumber = request.PhoneNumber,
		};

		var role = Roles.Realtor;

		var createUserResult = await userRepository.CreateUserAsync(user, request.Password, role);

		if (createUserResult.IsError)
			return createUserResult.Errors;

		//Save avatar
		var imageName = await imageStorageService.AddAvatarAsync(user, request.Avatar);

		if (imageName == null)
			return Error.Validation("Error in avatar saving");

		//Add Avatar to table
		user.Avatar = imageName;

		var resultOfAvatarSaving = await userRepository.UpdateProfileAsync(user);

		if (resultOfAvatarSaving.IsError) 
			return resultOfAvatarSaving;

		//Send Confirmation
		var sendConfirmationResult = await mediator.Send(
			new SendConfirmationEmailCommand(user.Email, request.BaseUrl));

		//ToDo make handler for this case in UI
		if (sendConfirmationResult.IsError)
			return sendConfirmationResult.Errors;

		return createUserResult;
	}
}