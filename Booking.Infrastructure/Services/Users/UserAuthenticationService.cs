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

		if (!signinResult.Succeeded)
			return Error.Unexpected();

		if (signinResult.IsNotAllowed)
			return Error.Validation("Email is not confirmed");

		if (signinResult.IsLockedOut)
			return Error.Validation("User is blocked");

		var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();

		if (role == null)
			return Error.NotFound("Role of user is not found");

		return role;
	}

    public Task<ErrorOr<Success>> LogoutUserAsync(Guid userId)
    {
        throw new NotImplementedException();
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
}
