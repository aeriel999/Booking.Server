using Booking.Domain.Posts;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Chat;

public class ChatRoom
{
	public required Guid ChatRoomId { get; set; }

	public required Guid ClientId { get; set; }

	public required Guid RealtorId { get; set; }

	public required Guid PostId { get; set; }

	public required string PostName { get; set; }	

	[ForeignKey(nameof(PostId))]
	public Post? Post { get; set; }

	public ICollection<UserMessage>? UserMessages { get; set; }
}
