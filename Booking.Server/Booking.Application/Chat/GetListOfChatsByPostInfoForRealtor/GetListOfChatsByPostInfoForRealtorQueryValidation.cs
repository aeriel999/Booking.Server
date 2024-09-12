using FluentValidation;

namespace Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;

public class GetListOfChatsByPostInfoForRealtorQueryValidation : AbstractValidator<GetListOfChatsByPostInfoForRealtorQuery>
{
    public GetListOfChatsByPostInfoForRealtorQueryValidation()
    {
        RuleFor(i => i.UserId).NotEmpty().WithMessage("{PropertyName} must not be empty");

		RuleFor(i => i.PostId).NotEmpty().WithMessage("{PropertyName} must not be empty");
	}
}
