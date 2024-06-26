using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.EditPost;

public record EditPostCommand(
	Guid UserId,
	Guid Id,
	string Name,
	Guid? PostTypeOfRentId,
	Guid? CategoryId,
	Guid? CountryId,
	Guid? CityId,
	string? CityName,
	Guid? StreetId,
	string? StreetName,
	string BuildingNumber,
	int? NumberOfRooms,
	int? Area,
	decimal Price,
	string? Description,
	List<byte[]>? Images,
	List<string>? DeleteImages) : IRequest<ErrorOr<Post>>;


