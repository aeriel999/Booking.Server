﻿using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Authentication;

public interface IUserAuthenticationService
{
	Task<ErrorOr<string>> LoginUserAsync(User user, string password);

	Task<string> GenerateEmailConfirmationTokenAsync(User user);

	Task<ErrorOr<Success>> ConfirmEmailAsync(Guid userId, string token);

	Task<string> GeneratePasswordResetTokenAsync(User user);

	Task<ErrorOr<User>> ResetPasswordAsync(User user, string token, string password);

	Task<string> GenerateEmailChangeTokenAsync(User user, string email);
}
