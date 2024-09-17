using Booking.Domain.Posts;
using Booking.Domain.Users;
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

//	public required int NumberOfUnreadMessages { get; set; }


	[ForeignKey(nameof(ClientId))]
	public User? Client { get; set; } // Navigation property for the client


	[ForeignKey(nameof(RealtorId))]
	public User? Realtor { get; set; } // Navigation property for the realtor
}
