using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.ForgotPassword;

public record ForgotPasswordRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[EmailAddress(ErrorMessage = "{PropertyValue} has wrong format")]
	[Length(5, 254)]
	public required string Email { get; init; }
}

 