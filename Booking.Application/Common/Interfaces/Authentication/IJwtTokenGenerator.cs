using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
	Task<string> GenerateJwtTokenAsync(User user, string role);
}
