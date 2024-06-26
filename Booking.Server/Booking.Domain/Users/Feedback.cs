using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Users;

public class Feedback
{
    public Guid Id { get; set; }

    public required string Text { get; set; }
    public float Rating { get; set; }

    public Guid RealtorId { get; set; }

    [ForeignKey(nameof(RealtorId))]
    public User? Realtor { get; set; }

    public Guid ClientId { get; set; }

    [ForeignKey(nameof(ClientId))]
    public User? Client { get; set; }

    public required DateTime FeedbackAt { get; set; }

}

