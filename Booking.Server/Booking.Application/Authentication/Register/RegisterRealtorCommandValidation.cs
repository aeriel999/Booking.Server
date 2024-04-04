using FluentValidation;

namespace Booking.Application.Authentication.Register;

internal class RegisterRealtorCommandValidation : AbstractValidator<RegisterRealtorCommand>
{
	public RegisterRealtorCommandValidation()
	{
		RuleFor(r => r.FirstName).NotEmpty().WithMessage("Field must not be empty")
				.MinimumLength(3).WithMessage("{PropertyName} must have at least 3 symbols")
				.MaximumLength(64).WithMessage("{PropertyName} must be less than 64 symbols")
				.Matches("^[^£# “” \"!@$%^&*(){}:;<>,.?/+_=|'~\\\\-]*$")
				.WithMessage("{PropertyName} must not contain the following characters £ # “” or spaces.");

		RuleFor(r => r.LastName).NotEmpty().WithMessage("Field must not be empty")
				.MinimumLength(3).WithMessage("{PropertyName} must have at least 3 symbols")
				.MaximumLength(64).WithMessage("{PropertyName} must be less than 64 symbols")
				.Matches("^[^£# “” \"!@$%^&*(){}:;<>,.?/+_=|'~\\\\-]*$")
				.WithMessage("{PropertyName} must not contain the following characters £ # “” or spaces.");

		RuleFor(r => r.PhoneNumber).NotEmpty().WithMessage("Field must not be empty")
			.MinimumLength(10).WithMessage("{PropertyName} must have at least 3 symbols")
			.MaximumLength(24).WithMessage("{PropertyName} must be less than 64 symbols")
			.Matches(@"^[+0-9() ]*$")
			.WithMessage("{PropertyName} must only contain digits, plus sign, parentheses, and space");

		RuleFor(r => r.Email).NotEmpty().WithMessage("{PropertyName} must not be empty")
		   .EmailAddress().WithMessage("Wrong email format")
		   .MinimumLength(5)
		   .MaximumLength(254);

		RuleFor(r => r.Password).NotEmpty().WithMessage("Field must not be empty")
			 .MaximumLength(24).MinimumLength(8)
			 .Matches("[A-Z]").WithMessage("{PropertyName} must contain one or more capital letters.")
			 .Matches("[a-z]").WithMessage("{PropertyName} must contain one or more lowercase letters.")
			 .Matches(@"\d").WithMessage("{PropertyName} must contain one or more digits.")
			 .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("Password must contain one or more special characters.")
			 .Matches("^[^£# “”]*$").WithMessage("{PropertyName} must not contain the following characters £ # “” or spaces."); ;

		RuleFor(r => r.ConfirmPassword).NotEmpty().WithMessage("Required field must not be empty.")
			.Equal(r => r.Password).WithMessage("Passwords are not matched");

		RuleFor(file => file.Avatar).NotNull().WithMessage("{PropertyName} must not be empty")
			.Must(file => file.Length <= (2 * 1024 * 1024)).WithMessage("File size must not exceed 2MB");
	}

	private static bool IsFileExtensionValid(string fileName)
	{
		var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
		var fileExtension = Path.GetExtension(fileName).ToLower();
		return allowedExtensions.Contains(fileExtension);
	}
}
