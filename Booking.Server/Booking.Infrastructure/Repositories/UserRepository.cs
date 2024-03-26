using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;

namespace Booking.Infrastructure.Repositories;

public class UserRepository(UserManager<User> userManager) : IUserRepository
{
    public async Task<ErrorOr<User>> CreateUserAsync(User user, string password, string role)
    {
        var createUserResult = await userManager.CreateAsync(user, password);

        if (!createUserResult.Succeeded)
            return Error.Failure("Error creating user");

        var addToRoleResult = await userManager.AddToRoleAsync(user, role);

        if (!addToRoleResult.Succeeded)
            return Error.Failure("Error creating user");

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

    public async Task<ErrorOr<User>> FindByEmilAsync(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return Error.NotFound("User not found");

        return user;
    }

    public async Task<ErrorOr<User>> FindByIdAsync(Guid userId)
    {
		var user = await userManager.FindByIdAsync(userId.ToString());

        if (user == null)
            return Error.NotFound();

        return user;
	}

	public async Task<ErrorOr<List<string>>> FindRolesByUserIdAsync(User user)
	{
        var roles = await userManager.GetRolesAsync(user);

		if (roles == null)
			return Error.NotFound();

        return roles.ToList();
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
}
