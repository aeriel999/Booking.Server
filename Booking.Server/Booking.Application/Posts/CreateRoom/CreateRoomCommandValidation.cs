using FluentValidation;

namespace Booking.Application.Posts.CreateRoom;

public class CreateRoomCommandValidation : AbstractValidator<CreateRoomCommand>
{
    public CreateRoomCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.PostId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.NumberOfGuests)
			.GreaterThanOrEqualTo(1).WithMessage("Number of guests must be at least 1.")
			.LessThanOrEqualTo(20);


		RuleFor(r => r.NumberOfRooms)
			.GreaterThanOrEqualTo(1).WithMessage("Number of rooms must be at least 1.")
			.LessThanOrEqualTo(1000);


		When(r => r.Discount.HasValue, () =>
		{
			RuleFor(r => r.Discount)
				.GreaterThanOrEqualTo(1).WithMessage("{PropertyName} must be at least 1.")
				.LessThanOrEqualTo(75);
		});


		RuleFor(r => r.Price).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.MainImage)
			.NotEmpty()
			.WithMessage("The main image must not be empty.")
			.Must(image => image.Length <= 5 * 1024 * 1024)
			.WithMessage("The main image must be less than or equal to 5MB.");
	}
}
