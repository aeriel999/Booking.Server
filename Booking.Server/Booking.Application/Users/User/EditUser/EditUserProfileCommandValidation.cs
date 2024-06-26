using FluentValidation;

namespace Booking.Application.Users.User.EditUser;
public class EditUserProfileCommandValidation : AbstractValidator<EditUserProfileCommand>
{
    public EditUserProfileCommandValidation()
    {
        RuleFor(x => x.Id)
             .NotEmpty().WithMessage("{ProperyName} must be not empty");

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("{PropertyName} is in the wrong format");
    }
}

