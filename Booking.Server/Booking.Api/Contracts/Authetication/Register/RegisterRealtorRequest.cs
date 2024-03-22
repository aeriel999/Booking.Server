using Booking.Api.Common.Validation;
using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.Register;

public record RegisterRealtorRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(2, 24)]
	public required string FirstName { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(2, 24)]
	public required string LastName { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Phone(ErrorMessage = "{PropertyValue} has wrong format")]
	[Length(10, 24)]
	public required string PhoneNumber { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[EmailAddress(ErrorMessage = "{PropertyValue} has wrong format")]
	[Length(5, 254)]
	public required string Email { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(8, 24)]
	public required string Password { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Compare("Password",
		ErrorMessage = "The password and confirmation password do not match.")]
	[Length(8, 24)]
	public required string ConfirmPassword { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[FileSize(2 * 1024 * 1024)]
	public required IFormFile Avatar { get; init; }
}
