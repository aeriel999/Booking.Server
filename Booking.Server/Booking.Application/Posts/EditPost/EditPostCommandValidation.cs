using FluentValidation;

namespace Booking.Application.Posts.EditPost;

public class EditPostCommandValidation : AbstractValidator<EditPostCommand>
{
    public EditPostCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(r => r.Id).NotEmpty().WithMessage("{PropertyName} must not be empty");


		RuleFor(r => r.Name).NotEmpty().WithMessage("{PropertyName} must not be empty")
			.MaximumLength(256).MinimumLength(8);


		When(r => !string.IsNullOrEmpty(r.CityName), () =>
		{
			RuleFor(r => r.CityName)
							.Matches(@"^[a-zA-Z0-9\s]*$") // Allows letters, digits, and spaces only
							.WithMessage("{PropertyName} must not contain special characters.")
							.MinimumLength(2)
							.MaximumLength(256);
		});


		When(r => !string.IsNullOrEmpty(r.StreetName), () =>
		{
			RuleFor(r => r.StreetName)
							.Matches(@"^[a-zA-Z0-9\s]*$") // Allows letters, digits, and spaces only
							.WithMessage("{PropertyName} must not contain special characters.")
							.MinimumLength(2)
							.MaximumLength(256);
		});


		RuleFor(r => r.ZipCode)
			.NotEmpty().WithMessage("{PropertyName} must not be empty")
			.InclusiveBetween(10000, 99999).WithMessage("{PropertyName} must be a 5-digit number.");


		When(r => r.NumberOfGuests.HasValue && r.NumberOfGuests > 0, () =>
		{
			RuleFor(r => r.NumberOfGuests)
				.GreaterThanOrEqualTo(1).WithMessage("{PropertyName} must be at least 1.")
				.LessThanOrEqualTo(20);
		});


		When(r => r.Discount > 0, () =>
		{
			RuleFor(r => r.Discount)
				.GreaterThanOrEqualTo(1).WithMessage("{PropertyName} must be at least 1.")
				.LessThanOrEqualTo(75);
		});


		RuleFor(r => r.Price).NotEmpty().WithMessage("{PropertyName} must not be empty");


		When(r => r.Images != null, () =>
		{
			RuleFor(r => r.Images)
				.Must(images => images!.Count <= 30)
				.WithMessage("You can upload up to 10 images.")
				.ForEach(imageRule =>
				{
					imageRule.Must(image => image.Length <= 5 * 1024 * 1024) 
						.WithMessage("Each image must be less than or equal to 5MB.");
				});
		});


		When(r => r.DeleteImages != null, () =>
		{
			RuleFor(r => r.DeleteImages)
				.ForEach(deleteImageRule =>
				{
					deleteImageRule.NotEmpty()
						.WithMessage("Delete image identifier must not be empty.");
				});
		});
	}
}
