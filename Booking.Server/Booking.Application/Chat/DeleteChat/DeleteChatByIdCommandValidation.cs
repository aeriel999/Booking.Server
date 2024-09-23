using FluentValidation;

namespace Booking.Application.Chat.DeleteChat;

public class DeleteChatByIdCommandValidation : AbstractValidator<DeleteChatByIdCommand>
{
    public DeleteChatByIdCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.ChatroomId).NotEmpty().WithMessage("Field must not be empty");
	}
}
