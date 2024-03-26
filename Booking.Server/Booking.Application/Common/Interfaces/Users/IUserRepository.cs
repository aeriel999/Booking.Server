using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Users;

public interface IUserRepository
{
	Task<ErrorOr<User>> FindByEmilAsync(string email);

	Task<ErrorOr<User>> FindByIdAsync(Guid userId);

	Task<ErrorOr<List<string>>> FindRolesByUserIdAsync(User user);

	Task<ErrorOr<User>> CreateUserAsync(User user, string password, string role);

	Task<ErrorOr<List<User>>> GetAllUsersAsync();

	Task<ErrorOr<User>> UpdateProfileAsync(User user);

	Task<ErrorOr<Deleted>> DeleteUserAsync(string userId);

	Task<ErrorOr<User>> GetUserAsync(string userId);

	Task<ErrorOr<User>> EditUserAsync(User user);
}
