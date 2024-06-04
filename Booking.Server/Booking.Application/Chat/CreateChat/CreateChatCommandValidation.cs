using FluentValidation;

namespace Booking.Application.Chat.CreateChat;

public class CreateChatCommandValidation : AbstractValidator<CreateChatCommand>
{
    public CreateChatCommandValidation()
    {
		RuleFor(r => r.PostId).NotEmpty().WithMessage("Field must not be empty");

		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");
	}
}
