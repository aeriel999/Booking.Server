using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.EditRoom;

public record EditRoomCommand(
	Guid UserId,
	Guid Id,
	int NumberOfGuests,
	int NumberOfRooms,
	decimal Price,
	int? Discount,
	byte[]? MainImage) : IRequest<ErrorOr<Success>>;
