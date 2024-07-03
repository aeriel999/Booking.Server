using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Users.User.SendFeedback;
public class SendFeedbackCommandValidation : AbstractValidator<SendFeedbackCommand>
{
    public SendFeedbackCommandValidation()
    {
        RuleFor(x => x.Text)
            .Must(x => String.IsNullOrEmpty(x) || (x.Length>=10 && x.Length<=300)).WithMessage("{PropertyName} must be epmty or must have length from 10 to 300");

        RuleFor(x => x.Rating)
            .NotEmpty().WithMessage("{PropertyName} must be not epmty")
            .InclusiveBetween(0, 5).WithMessage("{Property Name must be from 0 to 5}");

        RuleFor(x => x.RealtorId.ToString())
            .NotEmpty().WithMessage("{PropertyName} must be not epmty")
            .IsGuid();

        RuleFor(x => x.ClientId.ToString())
            .NotEmpty().WithMessage("{PropertyName} must be not epmty")
            .IsGuid();
    }
}

