namespace Booking.Api.Contracts.Post.SentFeedback;
public record SendFeedbackRequest
{
    public string? Text { get; set; }
    public float Rating { get; set; }
    public Guid PostId { get; set; }
}

