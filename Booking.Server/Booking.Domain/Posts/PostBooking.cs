using Booking.Domain.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Posts;

public class PostBooking
{
	public Guid Id { get; set; }

	public DateTime StartDate { get; set; }

	public DateTime EndDate { get; set; }

	public Guid UserId { get; set; }

	[ForeignKey(nameof(UserId))]
	public User? User { get; set; }

	public Guid PostId { get; set; }

	[ForeignKey(nameof(PostId))]
	public Post? Post { get; set; }
}
