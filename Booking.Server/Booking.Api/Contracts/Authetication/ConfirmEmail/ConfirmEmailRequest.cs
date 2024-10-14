using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.ConfirmEmail;

public record ConfirmEmailRequest {

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid UserId { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(100, 4096)]
	public required string Token { get; init; }
}
 
