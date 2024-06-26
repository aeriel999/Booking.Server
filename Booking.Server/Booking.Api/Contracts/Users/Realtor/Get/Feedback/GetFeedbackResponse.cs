namespace Booking.Api.Contracts.Users.Realtor.Get.Feedback;
public record GetFeedbackResponse
{
    public required string Text { get; set; }
    public float Rating { get; set; }
    public Guid ClientId { get; set; }
    public required string Client { get; set; }
    public  required DateTime  FeedbackAt { get; set; }
}

