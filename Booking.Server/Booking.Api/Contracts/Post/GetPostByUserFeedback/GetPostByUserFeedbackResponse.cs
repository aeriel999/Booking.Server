namespace Booking.Api.Contracts.Post.GetRealtorByUserFeedback;
public record GetPostByUserFeedbackResponse
{
    public Guid Id { get; set; }
    public required string Post { get; set; }
    public string? Image { get; set; }
}
