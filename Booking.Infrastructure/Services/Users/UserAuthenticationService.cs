using Booking.Application.Common.Interfaces.Authentication;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Booking.Infrastructure.Services.Users;

public class UserAuthenticationService(UserManager<User> userManager, SignInManager<User> signInManager) 
    : IUserAuthenticationService
{
    public async Task<string> GenerateEmailConfirmationTokenAsync(User user)
    {
        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);

        return token;
    }

    public async Task<ErrorOr<string>> LoginUserAsync(User user, string password)
    {
		var signinResult = await signInManager.PasswordSignInAsync(user, password,
			isPersistent: true, lockoutOnFailure: true);
	
		if (signinResult.IsNotAllowed)
			return Error.Forbidden("Email is not confirmed");

		if (signinResult.IsLockedOut)
			return Error.Forbidden("User is blocked");

        if (!signinResult.Succeeded)
            return Error.Failure("Wrong password");

		var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();

		if (role == null)
			return Error.NotFound("Role of user is not found");

		return role;
	}

    public async Task<ErrorOr<Success>> LogoutUserAsync()
    {
		await signInManager.SignOutAsync();

		return Result.Success;
	}

    public async Task<ErrorOr<Success>> ConfirmEmailAsync(Guid userId, string token)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());

        if (user == null)
            return Error.NotFound();

        var decoderToken = WebEncoders.Base64UrlDecode(token);

        var normalToken = Encoding.UTF8.GetString(decoderToken);

        var confirmEmailResult = await userManager.ConfirmEmailAsync(user, normalToken);

        if (!confirmEmailResult.Succeeded)
            return Error.Failure("User email is not confirmed!");

        return Result.Success;
    }

	public async Task<string> GeneratePasswordResetTokenAsync(User user)
	{
		var token = await userManager.GeneratePasswordResetTokenAsync(user);

        return token;
	}

    public async Task<ErrorOr<User>> ResetPasswordAsync(User user, string token, string password)
    {
		var decodedToken = WebEncoders.Base64UrlDecode(token);

		var normalToken = Encoding.UTF8.GetString(decodedToken);

		var result = await userManager.ResetPasswordAsync(user, normalToken, password);

        if (result.Succeeded)
            return user;
        else return Error.Failure(result.Errors.FirstOrDefault()!.Description.ToString());
	}
}
