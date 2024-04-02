using Microsoft.AspNetCore.Identity;

namespace Booking.Domain.Users;

public class User : IdentityUser<Guid>
{
    public string? FirstName { get; set; }

	public string? LastName { get; set; }

	public string? Avatar { get; set; }

	public int? Rating { get; set; }
}
