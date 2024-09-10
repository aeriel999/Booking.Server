using FluentValidation;

namespace Booking.Application.Chat.GetNumberOfUnleastMessages;

public class GetNumberOfUnleastMessagesQueryValidation : AbstractValidator<GetNumberOfUnleastMessagesQuery>
{
    public GetNumberOfUnleastMessagesQueryValidation()
    {
        RuleFor(n => n.UserId).NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
