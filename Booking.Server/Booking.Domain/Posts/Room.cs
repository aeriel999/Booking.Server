using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Posts;

public class Room
{
	public Guid Id { get; set; }

	public Guid HotelId { get; set; }


	[ForeignKey(nameof(HotelId))]
	public Post? Hotel { get; set; }

	public int? NumberOfGuests { get; set; }

	public int NumberOfRooms { get; set;}

	public decimal Price { get; set; }
}
