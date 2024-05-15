using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.CreatePost;

public record CreatePostCommand(
	Guid UserId,
	string Name,
	Guid PostTypeOfRentId,
	Guid CategoryId,
	Guid CountryId,
	Guid? CityId,
	string? CityName,
	Guid StreetId,
	string? StreetName,
	string BuildingNumber,
	int? NumberOfRooms,
	int? Area,
	decimal Price,
	string? Description,
	List<byte[]> Images) : IRequest<ErrorOr<Post>>;
 
