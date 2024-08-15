using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.CreateRoom;

public record CreateRoomCommand(
	Guid UserId,
	Guid PostId,
	int NumberOfGuests,
	int NumberOfRooms,
	decimal Price,
	int? Discount,
	byte[] MainImage) : IRequest<ErrorOr<Success>>;
 
