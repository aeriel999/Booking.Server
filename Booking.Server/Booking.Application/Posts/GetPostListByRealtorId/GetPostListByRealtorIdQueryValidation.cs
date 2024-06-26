using FluentValidation;

namespace Booking.Application.Posts.GetPostListByRealtorId;
public class GetPostListByRealtorIdQueryValidation:AbstractValidator<GetPostListByRealtorIdQuery>
{
    public GetPostListByRealtorIdQueryValidation()
    {
        RuleFor(x => x.id)
            .NotEmpty().WithMessage("{Property Name} must be not empty");
    }
}

