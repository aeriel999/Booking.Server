using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Authentication;

public interface IUserAuthenticationService
{
	Task<ErrorOr<string>> LoginUserAsync(User user, string password);
	Task<ErrorOr<Success>> LogoutUserAsync(Guid userId);
	Task<string> GenerateEmailConfirmationTokenAsync(User user);
	Task<ErrorOr<Success>> ConfirmEmailAsync(Guid userId, string token);
}
