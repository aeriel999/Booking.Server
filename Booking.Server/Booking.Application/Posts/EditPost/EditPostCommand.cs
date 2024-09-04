using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

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
	List<Guid>? PostTypesOfRest,
	List<Guid>? Services,
	List<string>? DeletedPostTypesOfRest,
	List<string>? DeletedServices,
	List<byte[]>? Images,
	byte[]? MainImage,
	List<DeletedImage>? DeleteImages,
	List<string> DeleteRooms) : IRequest<ErrorOr<Post>>;

public record DeletedImage
{
	public required string Name { get; init; }

	public required int Index { get; init; }
}
