using Booking.Domain.Users;
using System.ComponentModel.DataAnnotations.Schema;


namespace Booking.Domain.Posts;

public class Feedback
{
    public Guid Id { get; set; }


    public required string Text { get; set; }


    public float Rating { get; set; }


    public Guid PostId { get; set; }


    [ForeignKey(nameof(PostId))]
    public Post? Post { get; set; }


    public Guid ClientId { get; set; }


    [ForeignKey(nameof(ClientId))]
    public User? Client { get; set; }


    public required DateTime FeedbackAt { get; set; }
}

