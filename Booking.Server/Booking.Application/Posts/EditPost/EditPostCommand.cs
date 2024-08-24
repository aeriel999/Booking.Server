using Booking.Domain.Posts;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Posts.EditPost;

public record EditPostCommand(
	Guid UserId,
	Guid Id,
	string Name,
	Guid? CategoryId,
	Guid? CountryId,
	Guid? CityId,
	string? CityName,
	Guid? StreetId,
	string? StreetName,
	int ZipCode,
	int? NumberOfGuests,
	decimal Price,
	int? Discount,
	List<Guid>? PostPostTypesOfRest,
	List<Guid>? Services,
	List<byte[]>? Images,
	IFormFile? MainImage,
	List<string>? DeleteImages) : IRequest<ErrorOr<Post>>;

 
 
	


