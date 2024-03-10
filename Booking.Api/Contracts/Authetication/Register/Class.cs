using System.ComponentModel.DataAnnotations;
using static Booking.Api.Common.Validation.AtributeExtensions;

namespace Booking.Api.Contracts.Authetication.Register;

public record RegisterUserRequest
{

	//ToDo Find Swagger auth

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[EmailAddress(ErrorMessage = "{PropertyValue} has wrong email format")]
	[Length(5, 254)]
	public required string Email { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(8, 24)]
	public required string Password { get; init; }

	[CompareWithDisplayName("Password",
		ErrorMessage = "The new password and confirmation password do not match.")]
	[Length(8, 24)]
	public required string ConfirmPassword { get; set; }
}



