using FluentValidation;

namespace Booking.Application.Posts.CreatePost;

public class CreatePostCommandValidation : AbstractValidator<CreatePostCommand>
{
    public CreatePostCommandValidation()
    {
		//ToDo make validation
		//ToDo request.CityId == null && request.CityName != null
	}
}
