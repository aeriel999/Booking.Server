using FluentValidation;

namespace Booking.Application.Posts.EditPost;

public class EditPostCommandValidation : AbstractValidator<EditPostCommand>
{
    public EditPostCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.Id).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.Name).NotEmpty().WithMessage("Field must not be empty")
			.MaximumLength(256).MinimumLength(8);

		When(r => !string.IsNullOrEmpty(r.CityName), () =>
		{
			RuleFor(r => r.CityName)
							.Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]")
							.WithMessage("Password must contain one or more special characters.")
						   .MinimumLength(2)
						   .MaximumLength(256);
		});

		When(r => !string.IsNullOrEmpty(r.StreetName), () =>
		{
			RuleFor(r => r.StreetName)
							.Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]")
							.WithMessage("Password must contain one or more special characters.")
						   .MinimumLength(2)
						   .MaximumLength(256);
		});

		RuleFor(r => r.BuildingNumber)
		   .NotEmpty()
		   .WithMessage("Field must not be empty")
		   .MaximumLength(24)
		   .MinimumLength(1);

		RuleFor(r => r.Price)
			.NotEmpty()
			.WithMessage("Field must not be empty");

		When(r => !string.IsNullOrEmpty(r.Description), () =>
		{
			RuleFor(r => r.Description)
				.MinimumLength(256)
				.MaximumLength(5000);
		});

		When(r => r.Images != null, () =>
		{
			RuleFor(r => r.Images)
				.Must(images => images!.Count <= 10)
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
