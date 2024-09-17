using FluentValidation;

namespace Booking.Application.Chat.SetMessagesReadtByChatId;

public class SetMessagesReadtByChatIdCommandValidation : AbstractValidator<SetMessagesReadtByChatIdCommand>
{
    public SetMessagesReadtByChatIdCommandValidation()
    {
		RuleFor(n => n.UserId).NotEmpty().WithMessage("{PropertyName} must not be empty");

		RuleFor(n => n.ChatId).NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
