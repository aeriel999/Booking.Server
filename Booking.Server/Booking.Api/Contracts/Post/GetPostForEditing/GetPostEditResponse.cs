using Booking.Api.Contracts.Post.GetPost;

namespace Booking.Api.Contracts.Post.GetPostForEditing;

public record GetPostForEditResponse
{
	public required Guid Id { get; init; }


	public required string Name { get; init; }


	public required string CategoryName { get; init; }


	public required string CountryName { get; init; }
	public required Guid CountryId { get; init; }


	public required string CityName { get; init; }
	public required Guid CityId { get; init; }


	public required string StreetName { get; init; }


	public int ZipCode { get; init; }


	public int? Discount { get; init; }


	public int? NumberOfGuests { get; init; }


	public required decimal Price { get; init; }


	public required List<string> ImagePostList { get; init; }


	public List<Guid>? TypesOfRest { get; init; }


	public List<Guid>? Services { get; init; }


	public List<EditRoom>? RoomList { get; init; }
}
