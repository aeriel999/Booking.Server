using FluentValidation;

namespace Booking.Application.Chat.GetChatRoomsList;

public class GetChatRoomsListQueryValidation : AbstractValidator<GetChatRoomsListQuery>
{
    public GetChatRoomsListQueryValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");
	}
}
