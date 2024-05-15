using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Posts;

public class PostStreet
{
	public Guid Id { get; set; }

	public required string Name { get; set; }

	public Guid CityId { get; set; }

	[ForeignKey(nameof(CityId))]
	public PostCity? City { get; set; }

	public ICollection<Post>? Posts { get; set; }
}
