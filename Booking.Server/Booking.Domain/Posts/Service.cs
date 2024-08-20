namespace Booking.Domain.Posts;
public class Service
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

	public required string Icon { get; set; }

	public ICollection<PostService>? PostServices { get; set; }
}

