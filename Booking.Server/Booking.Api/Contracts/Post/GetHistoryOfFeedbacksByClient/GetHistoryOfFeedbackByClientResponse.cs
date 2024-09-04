namespace Booking.Api.Contracts.Post.GetHistoryOfFeedbacks;
public record GetHistoryOfFeedbackByClientResponse
{
    public Guid FeedbackId { get; init; }
    public Guid PostId { get; init; }
    public DateTime FeedbackAt { get; init; }
    public required string TextOfFeedback { get; init; }
    public float Rating { get; init; }
    public required string ImageOfPost { get; init; }
    public required string NameOfPost { get; init; }
    public required string Country { get; init; }
    public required string City{ get; init; }
}

