using Booking.Domain.Posts;
using Microsoft.AspNetCore.Identity;

namespace Booking.Domain.Users;

public class User : IdentityUser<Guid>
{
    public string? FirstName { get; set; }

	public string? LastName { get; set; }

	public string? Avatar { get; set; }

	public string? ProfileHeaderImage { get; set; }

	public float? Rating { get; set; }

	public ICollection<Post>? Posts { get; set; }

    public ICollection<Feedback>? SentFeedbacks { get; set; }

	public ICollection<PostBooking>? Bookings  { get; set; }
}
