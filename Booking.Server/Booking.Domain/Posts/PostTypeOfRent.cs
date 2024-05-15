namespace Booking.Domain.Posts;

public class PostTypeOfRent
{
	public Guid Id { get; set; }

	public required string Name { get; set; }

	public ICollection<Post>? Posts { get; set; }
}
