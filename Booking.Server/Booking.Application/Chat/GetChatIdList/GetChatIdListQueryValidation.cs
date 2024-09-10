using FluentValidation;

namespace Booking.Application.Chat.GetChatIdList;

public class GetChatIdListQueryValidation : AbstractValidator<GetChatIdListQuery>
{
    public GetChatIdListQueryValidation()
    {
		RuleFor(r => r.UserId).NotEmpty().WithMessage("Field must not be empty");


		RuleFor(r => r.Role).NotEmpty().WithMessage("Field must not be empty");

	}
}
