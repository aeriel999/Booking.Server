namespace Booking.Domain.Posts;

public class PostCategory
{
	public Guid Id { get; set; }

	public required string Name { get; set; }

	public ICollection<Post>? Posts { get; set; }
}
