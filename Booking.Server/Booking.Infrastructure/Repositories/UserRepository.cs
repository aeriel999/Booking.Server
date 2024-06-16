using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;

namespace Booking.Infrastructure.Repositories;

public class UserRepository(UserManager<User> userManager) : IUserRepository
{
	public async Task<List<User>> GetRealtorsAsync()
	{
		IList<User> list = await userManager.GetUsersInRoleAsync(Roles.Realtor);

        return list.ToList();
	}

    public async Task<ErrorOr<User>> CreateUserAsync(User user, string password, string role)
    {
        var createUserResult = await userManager.CreateAsync(user, password);

        if (!createUserResult.Succeeded)
            return Error.Validation("Error creating user");

        var addToRoleResult = await userManager.AddToRoleAsync(user, role);

        if (!addToRoleResult.Succeeded)
			return Error.Validation("Error creating user");

		return user;
    }

	public async Task<ErrorOr<User>> CreateUserAsync(User user, string role)
	{
		var createUserResult = await userManager.CreateAsync(user);

		if (!createUserResult.Succeeded)
			return Error.Validation("Error creating user");

		var addToRoleResult = await userManager.AddToRoleAsync(user, role);

		if (!addToRoleResult.Succeeded)
			return Error.Validation("Error creating user");

		return user;
	}

	public async Task<ErrorOr<User>> SaveUserAsync(User user)
	{
		var saveResult = await userManager.UpdateAsync(user);

		if (!saveResult.Succeeded)
			return Error.Validation("Error saving user");

		return user;
	}

	public Task<ErrorOr<Deleted>> DeleteUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<ErrorOr<User>> EditUserAsync(User user)
    {
        throw new NotImplementedException();
    }

    public async Task<ErrorOr<User>> FindByEmailAsync(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return Error.NotFound("User not found");

        return user;
    }

    public async Task<ErrorOr<User>> FindByIdAsync(string userId)
    {
		var user = await userManager.FindByIdAsync(userId);

        if (user == null)
            return Error.NotFound("User not found");

        return user;
	}

	public async Task<ErrorOr<List<string>>> FindRolesByUserIdAsync(User user)
	{
        var roles = await userManager.GetRolesAsync(user);

		if (roles == null)
			return Error.NotFound("Role not found");

        return roles.ToList();
	}

    //ToDo Async Method without await
	public async Task<string> GetUserNameByUserAsync(User user)
    {
		if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
		{
			if (string.IsNullOrEmpty(user.LastName) && string.IsNullOrEmpty(user.FirstName))
				return user.Email!;
			else if (string.IsNullOrEmpty(user.LastName))
				return user.FirstName!;
			else
				return user.LastName;
		}
		else
			return user.FirstName + " " + user.LastName;
	}
	public Task<ErrorOr<List<User>>> GetAllUsersAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ErrorOr<User>> GetUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<ErrorOr<User>> UpdateProfileAsync(User user)
    {
        throw new NotImplementedException();
    }

	public async Task<User?> FindByLoginAsync(string loginProvider, string providerKey)
	{
        return await userManager.FindByLoginAsync(loginProvider, providerKey);
	}

	public async Task<IdentityResult> AddLoginAsync(User user, UserLoginInfo userLoginInfo)
	{
		return await userManager.AddLoginAsync(user, userLoginInfo);
	}
}
