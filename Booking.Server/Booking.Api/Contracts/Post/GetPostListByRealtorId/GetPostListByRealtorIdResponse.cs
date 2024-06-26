namespace Booking.Api.Contracts.Post.GetPostListByRealtorId;
public record GetPostListByRealtorIdResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string ImagePost { get; set; }
}

