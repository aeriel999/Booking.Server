using FluentValidation;

namespace Booking.Application.Posts.EditRoom;

public class EditRoomCommandValidation : AbstractValidator<EditRoomCommand>
{
    public EditRoomCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.RoomId).NotEmpty().WithMessage("Field must not be empty");


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

		When(r => r.MainImage != null, () =>
		{
			RuleFor(r => r.MainImage)
			.Must(image => image!.Length <= 5 * 1024 * 1024)
			.WithMessage("The main image must be less than or equal to 5MB.");
		});
		
	}
}
}
