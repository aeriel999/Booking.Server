using Booking.Domain.Posts;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Chat;

public class ChatRoom
{
	public Guid ChatRoomId { get; set; }

	public Guid ClientId { get; set; }

	public Guid RealtorId { get; set; }

	public Guid PostId { get; set; }

	//ToDo Error in ading of Posts

	[ForeignKey(nameof(PostId))]
	public required Post Post { get; set; }

	public ICollection<UserMessage>? UserMessages { get; set; }
}
