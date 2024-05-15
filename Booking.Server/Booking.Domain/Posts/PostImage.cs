using System.ComponentModel.DataAnnotations.Schema;


namespace Booking.Domain.Posts;

public class PostImage
{
	public Guid Id { get; set; }

	public required string Name { get; set; }

	public required int Priority { get; set; }

	public Guid PostId { get; set; }

	[ForeignKey(nameof(PostId))]
	public Post? Post { get; set; }
}
