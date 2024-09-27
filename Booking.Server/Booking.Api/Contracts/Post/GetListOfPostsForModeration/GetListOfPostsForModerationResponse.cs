namespace Booking.Api.Contracts.Post.GetListOfPostsForModeration;

public record GetListOfPostsForModerationResponse
{
	public required Guid PostId { get; init; }


	public required string RealtorName { get; init; }


	public required Guid RealtorId { get; init; }


	public required string PostName { get; init; }


	public required string PostCategoryName { get; init; }


	public required string PostedDate { get; init; }
}
