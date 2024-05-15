using FluentValidation;

namespace Booking.Application.Users.Realtor;

public class EditRealtorPrifileInfoCommandValidation : AbstractValidator<EditRealtorPrifileInfoCommand>
{
    public EditRealtorPrifileInfoCommandValidation()
    {

		RuleFor(r => r.UserId).NotEmpty().WithMessage("{PropertyName} must not be empty");

		RuleFor(r => r.BaseUrl).NotEmpty().WithMessage("{PropertyName} must not be empty");

		When(r => !string.IsNullOrEmpty(r.Email), () =>
		{
			RuleFor(r => r.Email)
						   .EmailAddress().WithMessage("Wrong email format")
						   .MinimumLength(5)
						   .MaximumLength(254);
		});

		When(r => !string.IsNullOrEmpty(r.FirstName), () =>
		{
			RuleFor(r => r.FirstName)
				.MinimumLength(3).WithMessage("{PropertyName} must have at least 3 symbols")
				.MaximumLength(64).WithMessage("{PropertyName} must be less than 64 symbols")
				.Matches("^[^£# “” \"!@$%^&*(){}:;<>,.?/+_=|'~\\\\-]*$")
				.WithMessage("{PropertyName} must not contain the following characters £ # “” or spaces.");
		});

		When(r => !string.IsNullOrEmpty(r.LastName), () =>
		{
			RuleFor(r => r.LastName)
				.MinimumLength(3).WithMessage("{PropertyName} must have at least 3 symbols")
				.MaximumLength(64).WithMessage("{PropertyName} must be less than 64 symbols")
				.Matches("^[^£# “” \"!@$%^&*(){}:;<>,.?/+_=|'~\\\\-]*$")
				.WithMessage("{PropertyName} must not contain the following characters £ # “” or spaces.");
		});

		When(r => !string.IsNullOrEmpty(r.PhoneNumber), () =>
		{
			RuleFor(r => r.PhoneNumber)
				.MinimumLength(10).WithMessage("{PropertyName} must have at least 3 symbols")
				.MaximumLength(24).WithMessage("{PropertyName} must be less than 64 symbols")
				.Matches(@"^[+0-9() ]*$")
				.WithMessage("{PropertyName} must only contain digits, plus sign, parentheses, and space");
		});

		When(r => r.Avatar != null, () =>
		{
			RuleFor(file => file.Avatar).NotNull().WithMessage("{PropertyName} must not be empty")
			.Must(file => file!.Length <= (5 * 1024 * 1024)).WithMessage("File size must not exceed 2MB");
		});
	}
}
