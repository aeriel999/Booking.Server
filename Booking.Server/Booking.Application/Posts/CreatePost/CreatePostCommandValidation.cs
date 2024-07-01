﻿using FluentValidation;

namespace Booking.Application.Posts.CreatePost;

public class CreatePostCommandValidation : AbstractValidator<CreatePostCommand>
{
    public CreatePostCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.Name).NotEmpty().WithMessage("Field must not be empty")
			.MaximumLength(256).MinimumLength(8);

		RuleFor(r => r.PostTypeOfRentId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.CategoryId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.CountryId).NotEmpty().WithMessage("Field must not be empty");

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

		RuleFor(r => r.BuildingNumber).NotEmpty().WithMessage("Field must not be empty")
			.MaximumLength(24).MinimumLength(1);

		RuleFor(r => r.Price).NotEmpty().WithMessage("Field must not be empty");

		When(r => !string.IsNullOrEmpty(r.Description), () =>
		{
			RuleFor(r => r.Description)
						   .MinimumLength(256)
						   .MaximumLength(5000);
		});

		RuleFor(r => r.Images)
		 .NotEmpty()
		 .WithMessage("Images must not be empty")
		  .Must(images => images.Count <= 10)
		  .WithMessage("You can upload up to 10 images.")
		  .ForEach(imageRule =>
	   {
		   imageRule.Must(image => image.Length <= 5 * 1024 * 1024)  
			   .WithMessage("Each image must be less than or equal to 5MB.");
	   });

	}
}
