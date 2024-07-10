namespace Booking.Api.Contracts.Post.GetPostForEditing;

public record GetPostForEditResponse
{
	public required Guid Id { get; set; }

	public required string Name { get; set; }

	public required string CountryName { get; set; }

	public required Guid CountryId { get; set; }

	public required string CityName { get; set; }

	public required Guid CityId { get; set; }

	public required string CategoryName { get; set; }

	public string? Description { get; set; }

	public required string StreetName { get; set; }

	public int ZipCode{ get; set; }

	public int? NumberOfGuests { get; set; }

	public int? Discount { get; set; }

	public required string User { get; set; }

	public required bool IsArhive { get; set; }

	public required bool IsActive { get; set; }

	public required decimal Price { get; set; }

	public required string[] ImagePostList { get; set; }
}
