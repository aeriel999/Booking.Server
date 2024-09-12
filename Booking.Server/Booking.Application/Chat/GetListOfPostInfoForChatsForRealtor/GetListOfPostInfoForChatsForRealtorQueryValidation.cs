using FluentValidation;

namespace Booking.Application.Chat.GetListOfPostInfoForChatsForRealtor;

public class GetListOfPostInfoForChatsForRealtorQueryValidation 
	: AbstractValidator<GetListOfPostInfoForChatsForRealtorQuery>
{
    public GetListOfPostInfoForChatsForRealtorQueryValidation()
    {
        RuleFor(i => i.UserId).NotEmpty().WithMessage("Field must not be empty");
	}
}
