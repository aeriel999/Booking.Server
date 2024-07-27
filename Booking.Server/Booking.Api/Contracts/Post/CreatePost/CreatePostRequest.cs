using Booking.Domain.Posts;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Post.CreatePost;

public record CreatePostRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(8, 256)]
	public required string Name { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid CategoryId { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid CountryId { get; init; }

	public Guid? CityId { get; init; }

	public string? CityName { get; init; }

	public Guid? StreetId { get; init; }

	public string? StreetName { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Range(10000, 99999)]
	public int ZipCode { get; init; }
	
	public int? NumberOfGuests { get; init; }

	public string? Description { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Range(0, 9999999999999999.99, ErrorMessage = "{PropertyName} must be between {1} and {2}")]
	public decimal Price { get; init; }

	public int? Discount { get; init; }

	public List<Guid>? PostPostTypesOfRest { get; set; }

	public List<Guid>? PostServices { get; set; }

	[BindProperty(Name = "images[]")]
	public required List<IFormFile> Images { get; init; }
}
