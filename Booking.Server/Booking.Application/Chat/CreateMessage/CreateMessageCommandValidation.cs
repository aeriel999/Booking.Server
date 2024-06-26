using FluentValidation;

namespace Booking.Application.Chat.CreateMessage;
public class CreateMessageCommandValidation : AbstractValidator<CreateMessageCommand>
{
    public CreateMessageCommandValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");
		 
		RuleFor(r => r.Message).NotEmpty().WithMessage("Field must not be empty")
			.MaximumLength(5000).MinimumLength(2);

		RuleFor(r => r.RoomId).NotEmpty().WithMessage("Field must not be empty");
	}
}
