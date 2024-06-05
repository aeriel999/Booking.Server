using FluentValidation;

namespace Booking.Application.Posts.GetFilteredList;

public class GetFilteredListQueryValidation:AbstractValidator<GetFilteredListQuery>
{
    public GetFilteredListQueryValidation()
    {
        RuleFor(x => x.type)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x=>x.Equals("category") ||
            x.Equals("country") ||
            x.Equals("city") ||
            x.Equals("street") ||
            x.Equals("realtor")).WithMessage("{PropertyName} must be (category or country or city or street or realtor)");

        RuleFor(x => x.page)
       .NotEmpty().WithMessage("{PropertyName} must not be empty")
       .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0");

        RuleFor(x => x.sizeOfPage)
            .NotEmpty().WithMessage("{PropertyName} must not be empty")
            .Must(x => x.Equals(4)).WithMessage("{PropertyName} should be 4");

        RuleFor(x => x.id)
           .NotEmpty().WithMessage("{PropertyName} must not be empty");
    }
}

