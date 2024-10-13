using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using Booking.Domain.Posts;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
 

namespace Booking.Infrastructure.Repositories;

public class UserRepository(UserManager<User> userManager) 
    : IUserRepository
{
    public async Task<List<User>?> GetRealtorsFilteredListAsync(Guid? Category,Guid? Country, Guid? City)
	{
        var realtors = await userManager.GetUsersInRoleAsync(Roles.Realtor);
        
        return userManager.Users
            .Include(user => user.Posts!)
            .ThenInclude(post => post.Street!.City!.Country)
            .AsEnumerable()
            .Where(r =>  (r.Posts!=null)
                             &&(realtors.Any(realtor => realtor.Id == r.Id && r.Posts != null && r.Posts.Count>0 && r.Posts.Any(p => p.IsActive == true && p.IsArhive == false)) 
                             && (Category == null ? true : r.Posts!.Any(post => post.CategoryId == Category && post.IsActive == true && post.IsArhive == false))
                             && (City == null ? true : r.Posts!.Any(post => post.Street!.CityId == City && post.IsActive == true && post.IsArhive == false))
                             && (Country == null ? true : r.Posts!.Any(post => post.Street!.City!.CountryId == Country && post.IsActive == true && post.IsArhive == false))))
                .ToList();
	}

    public async Task<List<User>?> GetRealtorsListAsync()
    {
        var realtors = await userManager.GetUsersInRoleAsync(Roles.Realtor);

		if (realtors.Count > 0) return realtors.ToList();

		else return null;
	}

	public async Task<List<User>?> GetClientsListAsync()
	{
		var users = await userManager.GetUsersInRoleAsync(Roles.User);

        if (users.Count > 0) return users.ToList();

        else return null;
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

	public async Task<ErrorOr<User>> UpdateProfileAsync(User user)
	{
		var saveResult = await userManager.UpdateAsync(user);

		if (!saveResult.Succeeded)
			return Error.Validation("Error saving user");

		return user;
	}

	public async Task<ErrorOr<Deleted>> DeleteUserAsync(Guid userId)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());

        if (user == null) return Error.NotFound("Error");

        var result = await userManager.DeleteAsync(user);

        if(!result.Succeeded) return Error.Conflict(result.Errors.FirstOrDefault()!.Description);

        return Result.Deleted;
    }


    public async Task<ErrorOr<User>> FindByEmailAsync(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return Error.NotFound("User not found");

        return user;
    }


    public async Task<ErrorOr<User>> GetUserByIdAsync(Guid userId)
    {
		var user = await userManager.FindByIdAsync(userId.ToString());

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


    public async Task<ErrorOr<User>> ChangeRatingForRealtorAsync(Guid id,float rating)
    {
        var user = await userManager.FindByIdAsync(id.ToString());

        if (user == null) 
            return Error.NotFound("User not found");

        if(user.Rating == null)
            user.Rating = rating;
        else
            user.Rating = (user.Rating + rating) / 2;

        await UpdateProfileAsync(user);

        return user;
        
    }


	public async Task<User?> FindByLoginAsync(string loginProvider, string providerKey)
	{
        return await userManager.FindByLoginAsync(loginProvider, providerKey);
	}


	public async Task<IdentityResult> AddLoginAsync(User user, UserLoginInfo userLoginInfo)
	{
		return await userManager.AddLoginAsync(user, userLoginInfo);
	}
 
	 
    public async Task<ErrorOr<string>> GetRoleByUserAsync(User user)
    {
        var roles = await userManager.GetRolesAsync(user);

        if (roles == null)
            return Error.NotFound();

		return roles.FirstOrDefault()!;
	}


    public async Task<ErrorOr<bool>> IsPasswordAsync(Guid userId)
    {
        var user = await GetUserByIdAsync(userId);

        if(user.IsError) return user.Errors.FirstOrDefault();

        return await userManager.HasPasswordAsync(user.Value);
    }

	public async Task<string> GetUserNameByUserAsync(User user)
	{
		return await Task.Run(() =>
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
		});
	}
}
