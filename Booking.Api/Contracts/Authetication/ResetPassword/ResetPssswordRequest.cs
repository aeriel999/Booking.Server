using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.ResetPassword;

public record ResetPssswordRequest
{
    [Required(ErrorMessage = "{PropertyName} must not be empty")]
    [EmailAddress(ErrorMessage = "{PropertyValue} has wrong format")]
    [Length(5, 254)]
    public required string Email { get; init; }

    [Required(ErrorMessage = "{PropertyName} must not be empty")]
    [Length(256, 4096)]
    public required string Token { get; init; }

    [Required(ErrorMessage = "{PropertyName} must not be empty")]
    [Length(8, 24)]
    public required string Password { get; init; }

    [Required(ErrorMessage = "{PropertyName} must not be empty")]
    [Compare("Password",
        ErrorMessage = "The password and confirmation password do not match.")]
    [Length(8, 24)]
    public required string ConfirmPassword { get; init; }
}
