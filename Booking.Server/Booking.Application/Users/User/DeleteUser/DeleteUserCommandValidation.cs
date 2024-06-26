using FluentValidation;

namespace Booking.Application.Users.User.DeleteUser;
public class DeleteUserCommandValidation : AbstractValidator<DeleteUserCommand>
{
    public DeleteUserCommandValidation()
    {
        RuleFor(x => x.id)
            .NotEmpty().WithMessage("{ProperyName} must be not empty");
    }
}

