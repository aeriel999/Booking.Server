using Booking.Domain.Posts;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

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
	decimal Price,
	int? Discount,
	List<Guid>? PostTypesOfRest,
	List<Guid>? PostServices,
	List<byte[]> Images,
	byte[] MainImage) : IRequest<ErrorOr<Post>>;
