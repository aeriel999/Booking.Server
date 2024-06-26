using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Users.User.Edit;
public record EditUserProfileRequest
{
    [EmailAddress(ErrorMessage = "{PropertyValue} has wrong format")]
    [Length(5, 254)]
    public string? Email { get; set; }
}

