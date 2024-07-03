using Booking.Application.Common.Behaviors.CustomValidators;
using FluentValidation;

namespace Booking.Application.Posts.GetPostById;

public class GetPostByIdQueryValidation:AbstractValidator<GetPostByIdQuery>
{
    public GetPostByIdQueryValidation()
    {
        RuleFor(x => x.Id.ToString())
          .NotEmpty().WithMessage("{PropertyName} must not be empty")
          .IsGuid();

    }
}

