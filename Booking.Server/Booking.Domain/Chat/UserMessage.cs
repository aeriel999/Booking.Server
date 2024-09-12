using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Chat;

public class UserMessage
{
	public Guid Id { get; set; }

	public required Guid UserId { get; set; }

	public required string Message { get; set; }

	public Guid ChatRoomId { get; set; }

	[ForeignKey(nameof(ChatRoomId))]
	public required ChatRoom ChatRoom { get; set; }

	public required DateTime SentAt { get; set; }
 
	public bool IsRead { get; set; }
}


