using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.CreateRoom;

public class CreateRoomCommandHandler(
	IUserRepository userRepository,
	IPostRepository postRepository,
	IImageStorageService imageStorageService,
	IRoomRepository roomRepository) : IRequestHandler<CreateRoomCommand, ErrorOr<Success>>
{
	public async Task<ErrorOr<Success>> Handle(CreateRoomCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.FindByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		var user = userOrError.Value;

		//Get post
		var getPostResult = await postRepository.GetPostByIdAsync(request.PostId);

		if (getPostResult == null)
			return Error.NotFound("Post not created");

		//Save Image
		if (request.MainImage != null)
		{
			var imageName = await imageStorageService.SavePostImageInStorageAsync(request.MainImage);

			if (imageName == null)
				return Error.Validation("Image not save");

			//Create Room
			var room = new Room
			{
				HotelId = request.PostId,
				NumberOfGuests = request.NumberOfGuests,
				NumberOfRooms = request.NumberOfRooms,
				Price = request.Price,
				Discount = request.Discount,
				MainImage = imageName
			};

			await roomRepository.CreateRoomAsync(room);
		}

		return Result.Success;
	}
}
