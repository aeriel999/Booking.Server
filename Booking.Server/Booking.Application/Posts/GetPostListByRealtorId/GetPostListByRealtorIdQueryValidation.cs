using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.GetPostListByRealtorId;
public class GetPostListByRealtorIdQueryValidation:AbstractValidator<GetPostListByRealtorIdQuery>
{
    public GetPostListByRealtorIdQueryValidation()
    {
        RuleFor(x => x.Id.ToString())
            .NotEmpty().WithMessage("{Property Name} must be not empty")
            .IsGuid();
    }
}

