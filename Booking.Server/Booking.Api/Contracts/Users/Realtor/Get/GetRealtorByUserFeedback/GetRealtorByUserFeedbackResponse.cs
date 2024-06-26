namespace Booking.Api.Contracts.Users.Realtor.Get.GetRealtorByUserFeedback;
public record GetRealtorByUserFeedbackResponse
{
    public Guid Id { get; set; }
    public required string Realtor { get; set; }
    public string? Avatar { get; set; }
}
