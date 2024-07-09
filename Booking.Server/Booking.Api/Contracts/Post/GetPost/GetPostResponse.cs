namespace Booking.Api.Contracts.Post.GetPost;

public record GetPostResponse
{
	public required Guid Id { get; set; }

	public required string Name { get; set; }

	public required string CountryName { get; set; }

	public required Guid CountryId { get; set; }

	public required string CityName { get; set; }

	public required Guid CityId { get; set; }

	public required string Category { get; set; }

	public string? Description { get; set; }

	public required string Street { get; set; }

	public string? BuildingNumber { get; set; }

	public int? NumberOfRooms { get; set; }

	public int? Area { get; set; }

	public required string User { get; set; }
    public required Guid UserId { get; set; }

    public required bool IsArhive { get; set; }

	public required decimal Price { get; set; }

	public required string[] ImagePostList { get; set; }

}
