using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.Common.Interfaces.Users;

public interface IUserRepository
{
    Task<List<User>> GetRealtorsAsync();


    Task<ErrorOr<User>> FindByEmailAsync(string email);


	Task<ErrorOr<User>> FindByIdAsync(Guid userId);


	Task<ErrorOr<List<string>>> FindRolesByUserIdAsync(User user);


	Task<ErrorOr<User>> CreateUserAsync(User user, string password, string role);


	Task<ErrorOr<User>> CreateUserAsync(User user, string role);


	Task<ErrorOr<List<User>>> GetAllUsersAsync();


	Task<ErrorOr<Updated>> EditUserAsync(Guid id, string? email);


	Task<ErrorOr<User>> SaveUserAsync(User user);


	Task<string> GetUserNameByUserAsync(User user);


	Task<User?> FindByLoginAsync(string loginProvider, string providerKey);


	Task<IdentityResult> AddLoginAsync(User user, UserLoginInfo userLoginInfo);


	Task<ErrorOr<User>> ChangeRatingForRealtorAsync(Guid id, float rating);


	Task<ErrorOr<Deleted>> DeleteUserAsync(Guid userId);
}
