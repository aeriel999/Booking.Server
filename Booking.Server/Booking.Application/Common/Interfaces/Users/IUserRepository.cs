using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.Common.Interfaces.Users;

public interface IUserRepository
{
	Task<List<User>> GetRealtorsFilteredListAsync(Guid? Category, Guid? Country, Guid? City);


    Task<List<User>?> GetRealtorsListAsync();


    Task<ErrorOr<User>> FindByEmailAsync(string email);


	Task<ErrorOr<User>> GetUserByIdAsync(Guid userId);


	Task<ErrorOr<List<string>>> FindRolesByUserIdAsync(User user);


	Task<ErrorOr<User>> CreateUserAsync(User user, string password, string role);


	Task<ErrorOr<User>> CreateUserAsync(User user, string role);


	Task<ErrorOr<User>> UpdateProfileAsync(User user);


	Task<ErrorOr<Deleted>> DeleteUserAsync(Guid userId);


	Task<ErrorOr<Updated>> EditUserAsync(Guid id, string? email);


	Task<string> GetUserNameByUserAsync(User user);


	Task<User?> FindByLoginAsync(string loginProvider, string providerKey);


	Task<IdentityResult> AddLoginAsync(User user, UserLoginInfo userLoginInfo);


	Task<ErrorOr<User>> ChangeRatingForRealtorAsync(Guid id, float rating);


	Task<ErrorOr<string>> GetRoleByUserAsync(User user);

	Task<ErrorOr<bool>> IsPasswordAsync(Guid userId);


	//Task<ErrorOr<Deleted>> DeleteUserAsync(Guid userId);


	Task<List<User>?> GetClientsListAsync();
}
