using FluentValidation;

namespace Booking.Application.Posts.GetNameOfPost;
public class GetNameOfPostQueryValidation:AbstractValidator<GetNameOfPostQuery>
{
    public GetNameOfPostQueryValidation()
    {
        /*RuleFor(x => x.name)
            .NotEmpty().WithMessage("{PropertyName} must not be empty");*/
    }
}

