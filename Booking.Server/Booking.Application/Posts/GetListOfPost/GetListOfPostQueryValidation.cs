using FluentValidation;

namespace Booking.Application.Posts.GetListOfPost;

public class GetListOfPostQueryValidation:AbstractValidator<GetListOfPostQuery>
{
    public GetListOfPostQueryValidation()
    {
        RuleFor(x=>x.Page)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

        RuleFor(x=>x.SizeOfPage)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x=>x.Equals(9)).WithMessage("{PropertyName} should be 9");

    }
}

