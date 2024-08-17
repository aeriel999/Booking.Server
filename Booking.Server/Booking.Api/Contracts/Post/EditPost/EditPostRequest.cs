using Booking.Domain.Posts;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Post.EditPost;

public record EditPostRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid Id { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(8, 124)]
	public required string Name { get; init; }

	public Guid? CategoryId { get; init; }


	public Guid? CountryId { get; init; }


	public Guid? CityId { get; init; }
	public string? CityName { get; init; }


	public Guid? StreetId { get; init; }
	public string? StreetName { get; init; }


	public int ZipCode { get; init; }


	public int? NumberOfGuests { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Range(0, 9999999999999999.99, ErrorMessage = "{PropertyName} must be between {1} and {2}")]
	public decimal Price { get; init; }


	public List<Guid>? PostTypesOfRest { get; set; }


	public List<Guid>?  Services { get; set; }



	[BindProperty(Name = "images[]")]
	public List<IFormFile>? Images { get; init; }


	public List<string>? DeleteImages { get; init; }


	public List<Room>? RoomList { get; init; }
}
