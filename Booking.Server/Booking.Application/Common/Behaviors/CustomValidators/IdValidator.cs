using FluentValidation;

namespace Booking.Application.Common.Behaviors.CustomValidators;
public static class IdValidator
{
    public static IRuleBuilderOptions<T,string> IsGuid<T>(this IRuleBuilder<T,string> ruleBuilder)
    {
        return ruleBuilder.Must(id => Guid.TryParse(id, out var newGuid)).WithMessage("{PropertyName} is not guid");
    }
}

