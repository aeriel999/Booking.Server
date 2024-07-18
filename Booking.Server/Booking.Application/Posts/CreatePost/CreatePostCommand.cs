using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.CreatePost;

public record CreatePostCommand(
	Guid UserId,
	string Name,
	Guid CategoryId,
	Guid CountryId,
	Guid? CityId,
	string? CityName,
	Guid? StreetId,
	string? StreetName,
	int ZipCode,
	int? NumberOfGuests,
	string? Description,
	decimal Price,
	int? Discount,
	List<byte[]> Images) : IRequest<ErrorOr<Post>>;
 
