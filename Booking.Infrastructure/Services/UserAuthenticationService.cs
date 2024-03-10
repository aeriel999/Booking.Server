using Booking.Application.Common.Interfaces.Authentication;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Booking.Infrastructure.Services;
public class UserAuthenticationService(UserManager<User> userManager) : IUserAuthenticationService
{
	public async Task<string> GenerateEmailConfirmationTokenAsync(User user)
	{
		var token = await userManager.GenerateEmailConfirmationTokenAsync(user);

		return token;
	}

	public Task<ErrorOr<string>> LoginUserAsync(string email, string password)
	{
		throw new NotImplementedException();
	}

	public Task<ErrorOr<Success>> LogoutUserAsync(string userId)
	{
		throw new NotImplementedException();
	}

	public async Task<ErrorOr<Success>> ConfirmEmailAsync(string userId, string token)
	{
		var user = await userManager.FindByIdAsync(userId);

		if (user == null)
			return Error.NotFound(userId);

		var decoderToken = WebEncoders.Base64UrlDecode(token);

		var normalToken = Encoding.UTF8.GetString(decoderToken);

		var confirmEmailResult = await userManager.ConfirmEmailAsync(user, normalToken);

		if (!confirmEmailResult.Succeeded)
			return Error.Failure("User email is not confirmed!");

		return Result.Success;
	}
}
