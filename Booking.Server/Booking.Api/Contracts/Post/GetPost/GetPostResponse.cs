using Booking.Domain.Posts;

namespace Booking.Api.Contracts.Post.GetPost;

public record GetPostResponse
{
	public required Guid Id { get; init; }


	public required string Name { get; init; }


	public required string CategoryName { get; init; }
	public required Guid CategoryId { get; init; }


	public required string CountryName { get; init; }
	public required Guid CountryId { get; init; }


	public required string CityName { get; init; }
	public required Guid CityId { get; init; }


	public required string StreetName { get; init; }
	public required Guid StreetId { get; init; }


	public int ZipCode { get; init; }


	public int? Discount { get; init; }


	public int? NumberOfGuests { get; init; }


	public required string UserName { get; init; }
    public required Guid UserId { get; init; }


	public required decimal Price { get; init; }


	public required float Rate { get; init; }


	public int? CountOfFeedbacks { get; init; }


	public required string[] ImagePostList { get; init; }


    public string[]? TypesOfRest { get; init; }


    public string[]? Services { get; init; }


	public List<Room>? RoomList { get; init; }
}
