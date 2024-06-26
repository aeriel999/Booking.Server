using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.Login;

public record GoogleLoginUserRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(256, 4096)]
	public required string GoogleToken { get; set; }
}
