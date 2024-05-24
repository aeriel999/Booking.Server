using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Posts;

public class PostCity
{
	public Guid Id { get; set; }

	public string? Name { get; set; }

	public Guid CountryId { get; set; }

	[ForeignKey(nameof(CountryId))]
	public PostCountry? Country { get; set; }

	public ICollection<PostStreet>? Streets { get; set; }

	public static implicit operator PostCity?(List<PostCity>? v)
	{
		throw new NotImplementedException();
	}
}
