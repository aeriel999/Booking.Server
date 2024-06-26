namespace Booking.Api.Contracts.Users.User.SentFeedback;
public record SendFeedbackRequest
{
    public string Text { get; set; }
    public float Rating { get; set; }
    public Guid RealtorId { get; set; }
}

