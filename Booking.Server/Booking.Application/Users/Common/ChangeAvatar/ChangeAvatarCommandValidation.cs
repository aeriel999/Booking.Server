using FluentValidation;

namespace Booking.Application.Users.Common.ChangeAvatar;

internal class ChangeAvatarCommandValidation : AbstractValidator<ChangeAvatarCommand>
{
    public ChangeAvatarCommandValidation()
    {
		RuleFor(file => file.Avatar).NotNull().WithMessage("{PropertyName} must not be empty")
		   .Must(file => file!.Length <= 5 * 1024 * 1024).WithMessage("File size must not exceed 5MB");
	}
}
