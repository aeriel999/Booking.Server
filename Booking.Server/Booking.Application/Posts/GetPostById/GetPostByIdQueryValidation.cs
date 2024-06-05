using FluentValidation;

namespace Booking.Application.Posts.GetPostById;

public class GetPostByIdQueryValidation:AbstractValidator<GetPostByIdQuery>
{
    public GetPostByIdQueryValidation()
    {
        RuleFor(x => x.id)
          .NotEmpty().WithMessage("{PropertyName} must not be empty");
    }
}

