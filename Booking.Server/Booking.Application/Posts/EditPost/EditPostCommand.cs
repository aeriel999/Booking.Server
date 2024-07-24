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
	string? Description,
	decimal Price,
	int? Discount,
	List<Guid>? PostPostTypesOfRest,
	List<Guid>? PostServices,
	List<byte[]>? Images,
	List<string>? DeleteImages) : IRequest<ErrorOr<Post>>;

 
 
	


