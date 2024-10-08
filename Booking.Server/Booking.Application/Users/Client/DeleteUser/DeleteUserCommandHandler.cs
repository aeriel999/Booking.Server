﻿using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.DeleteUser;
public class DeleteUserCommandHandler(IUserRepository userRepository) : IRequestHandler<DeleteUserCommand, ErrorOr<Deleted>>
{
	public async Task<ErrorOr<Deleted>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
	{
		var result = await userRepository.DeleteUserAsync(request.Id);

		if (result.IsError) return Error.Custom((int)result.Errors.FirstOrDefault().Type,
			result.Errors.FirstOrDefault().Code,
			result.Errors.FirstOrDefault().Description);

		return Result.Deleted;
	}
}

