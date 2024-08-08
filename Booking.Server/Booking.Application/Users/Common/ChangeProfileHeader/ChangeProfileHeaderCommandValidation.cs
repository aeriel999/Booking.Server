using FluentValidation;

namespace Booking.Application.Users.Common.ChangeProfileHeader;

public class ChangeProfileHeaderCommandValidation : AbstractValidator<ChangeProfileHeaderCommand>
{
    public ChangeProfileHeaderCommandValidation()
    {
		RuleFor(file => file.ProfileHeaderImage)
		   .NotNull().WithMessage("{PropertyName} must not be empty")
		   .Must(file => file!.Length <= 5 * 1024 * 1024)
		   .WithMessage("File size must not exceed 5MB");
	}
}
