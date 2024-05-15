using Booking.Domain.Users;

namespace Booking.Application.Common.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
	Task<string> GenerateJwtTokenAsync(User user, string role);
}
