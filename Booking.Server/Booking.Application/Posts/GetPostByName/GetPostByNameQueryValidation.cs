using FluentValidation;

namespace Booking.Application.Posts.GetPostByName;

public class GetPostByNameQueryValidation:AbstractValidator<GetPostByNameQuery>
{
    public GetPostByNameQueryValidation()
    {
       /*RuleFor(x => x.name)
            .NotEmpty().WithMessage("{PropertyName} must not be empty");*/

        /*RuleFor(x => x.Page)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

        RuleFor(x => x.SizeOfPage)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x => x.Equals(9)).WithMessage("{PropertyName} should be 9");*/
    }
}

