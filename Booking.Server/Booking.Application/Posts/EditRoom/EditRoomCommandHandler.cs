using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.EditRoom;

public class EditRoomCommandHandler(
	IUserRepository userRepository,
	IPostRepository postRepository,
	IImageStorageService imageStorageService,
	IRoomRepository roomRepository) : IRequestHandler<EditRoomCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(EditRoomCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		var user = userOrError.Value;

		//Get room
		var roomOrError = await roomRepository.GetRoomByIdAsync(request.UserId);

		if (userOrError.IsError) return Error.NotFound("Room is not found");

		var room = roomOrError.Value;

		//Update room info
		if (request.NumberOfGuests != room.NumberOfGuests)
			room.NumberOfGuests = request.NumberOfGuests;

		if (request.NumberOfRooms != room.NumberOfRooms)
			room.NumberOfRooms = request.NumberOfRooms;

        if (request.Price != request.Price)
			room.Price = request.Price;
         
		if(request.Discount != null && request.Discount != room.Discount)
			room.Discount = request.Discount;

		//Update Main image
		if (request.MainImage != null)
		{
			imageStorageService.DeleteImage(room.MainImage, "posts");

			var imageName = await imageStorageService.SavePostImageInStorageAsync(request.MainImage);

			if (imageName == null)
				return Error.Validation("Image not save");
		}

		await roomRepository.UpdateRoomAsync(room);

		return Result.Success;
	}
}

