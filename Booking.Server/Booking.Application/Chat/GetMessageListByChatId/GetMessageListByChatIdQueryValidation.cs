using FluentValidation;

namespace Booking.Application.Chat.GetMessageListByChatId;

public class GetMessageListByChatIdQueryValidation : AbstractValidator<GetMessageListByChatIdQuery>
{
    public GetMessageListByChatIdQueryValidation()
    {
        RuleFor(n => n.UserId).NotEmpty().WithMessage("{PropertyName} must not be empty");

		RuleFor(n => n.ChatRoomId).NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
