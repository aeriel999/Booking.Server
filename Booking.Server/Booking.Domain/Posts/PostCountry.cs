namespace Booking.Domain.Posts;

public class PostCountry
{
	public Guid Id { get; set; }

	public required string Name { get; set; }

	public ICollection<Post>? Posts { get; set; }

	public ICollection<PostCity>? Cities { get; set; }
}


