using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.Register;

public record RegisterUserRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[EmailAddress(ErrorMessage = "{PropertyValue} has wrong email format")]
	[Length(5, 254)]
	public required string Email { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(8, 24)]
	public required string Password { get; init; }

	[Compare("Password",
		ErrorMessage = "The password and confirmation password do not match.")]
	[Length(8, 24)]
	public required string ConfirmPassword { get; init; }
}



